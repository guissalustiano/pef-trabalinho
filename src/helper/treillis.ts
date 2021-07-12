import { Vector2d } from "konva/lib/types";
import * as math from "mathjs";
import { BasicEdge, MutableWeightedGraph } from "graphs-for-js";

export type TreillisNode = {
  id: string,
  pos: Vector2d,
  force?: Partial<Vector2d>,
  hiddenForce?: Partial<Vector2d>,
  link?: { x?: boolean, y?: boolean },
}

export type TreillisEdge = {
  forceModule?: number,
}

export type matrixSequenceInfo = { node: TreillisNode, posKey: 'x' | 'y' }


// Baseado em https://edisciplinas.usp.br/pluginfile.php/4109576/mod_resource/content/1/Notas%20de%20aula-%20v2.pdf
// https://www.youtube.com/watch?v=aDPaofpQt5g
// util
const pow2 = (x: number) => x * x;
const distance = (p: Vector2d, q: Vector2d) => math.sqrt(pow2(p.x - q.x) + pow2(p.y - q.y))
const edgeWidth = (edge: BasicEdge<TreillisNode, TreillisEdge>) => distance(edge.source.pos, edge.target.pos)
const ttranposeMt = (t: math.Matrix, m: math.Matrix) => math.multiply(math.transpose(t), math.multiply(m, t));

// function printMatrix(m: math.Matrix) {
//   const size = m.size()
//   for (let i = 0; i < size[0]; i++) {
//     const line = [];
//     for (let j = 0; j < size[1]; j++) {
//       const e = m.subset(math.index(i, j)) as unknown as number;
//       const space = e < 0 ? "" : " ";
//       line.push(space + e.toFixed(3))
//     }
//     console.log(line)
//   }
// }


// 2.1 do pdf
function localSystemStiffnessMatrix(edge: BasicEdge<TreillisNode, TreillisEdge>) {
  const k = math.matrix([
    [1, 0, -1, 0],
    [0, 0, 0, 0],
    [-1, 0, 1, 0],
    [0, 0, 0, 0],
  ]);
  const l = edgeWidth(edge);
  return math.multiply(1 / l, k) as math.Matrix;
}

function edgeAngleFromGlobalX(edge: BasicEdge<TreillisNode, TreillisEdge>) {
  const deltaY = edge.target.pos.y - edge.source.pos.y;
  const deltaX = edge.target.pos.x - edge.source.pos.x;
  return math.atan2(deltaY, deltaX);
}

// 2.2 do pdf
function transformationMatrixFromGlobalToLocalSystem(edge: BasicEdge<TreillisNode, TreillisEdge>) {
  const theta = edgeAngleFromGlobalX(edge);
  const cosTheta = math.cos(theta);
  const sinTheta = math.sin(theta);

  const t = math.matrix([
    [cosTheta, sinTheta, 0, 0],
    [-sinTheta, cosTheta, 0, 0],
    [0, 0, cosTheta, sinTheta],
    [0, 0, -sinTheta, cosTheta],
  ]);
  return t;
}

function globalSystemStiffnessMatrix(edge: BasicEdge<TreillisNode, TreillisEdge>) {
  const klocal = localSystemStiffnessMatrix(edge)
  const t = transformationMatrixFromGlobalToLocalSystem(edge);

  // k = t^T * klocal * t
  const k = ttranposeMt(t, klocal);
  return k;
}

function nodalDisplacementsInfoFromNode(node: TreillisNode) {
  return [{ node, posKey: 'x' }, { node, posKey: 'y' }] as matrixSequenceInfo[]
}

function nodalDisplacementsInfoFromEdge(edge: BasicEdge<TreillisNode, TreillisEdge>) {
  return [edge.source, edge.target].flatMap(nodalDisplacementsInfoFromNode);
}

function equalsMatrixSequenceInfo(a: matrixSequenceInfo, b: matrixSequenceInfo) {
  return a.node === b.node && a.posKey === b.posKey;
}

function sparseMatrix(edge: BasicEdge<TreillisNode, TreillisEdge>, sequence: matrixSequenceInfo[]) {
  const indices = nodalDisplacementsInfoFromEdge(edge)
    .map(info =>
      sequence.findIndex(s =>
        equalsMatrixSequenceInfo(info, s)));
  const lines = indices.map(i => {
    const line = new Array(sequence.length).fill(0);
    line[i] = 1
    return line;
  })
  return math.matrix(lines)
}

function sparseStiffnessMatrix(edge: BasicEdge<TreillisNode, TreillisEdge>, sequence: matrixSequenceInfo[]) {
  const stiffnessMatrix = globalSystemStiffnessMatrix(edge);
  const sparcematrix = sparseMatrix(edge, sequence)

  const result = ttranposeMt(sparcematrix, stiffnessMatrix);
  return result;
}

function reduceMatrix(indx: number[], indy: number[], matrix: math.Matrix) {
  const lenx = indx.length
  const leny = indy.length
  let rmatrix = math.zeros(lenx, leny)
  for (let i = 0; i < lenx; i++) {
    for (let j = 0; j < leny; j++) {
      const e = math.subset(matrix, math.index(indx[i], indy[j]));
      rmatrix = math.subset(rmatrix, math.index(i, j), e);
    }
  }
  return rmatrix;
}

function solveStiffnessMatrix(treillis: MutableWeightedGraph<TreillisNode, TreillisEdge>) {
  const nodes = treillis.nodes();
  const edges = treillis.edges();
  const sequence = nodes
    .flatMap(nodalDisplacementsInfoFromNode)
  const sequencePlus = sequence
    .map((s, index) => ({
      index,
      force: s.node.force===undefined ? 0 : s.node.force[s.posKey],
      link: s.node.link===undefined ? false : s.node.link[s.posKey],
      ...s
    }));

  const stiffnessMatrix = edges
    .map(edge => sparseStiffnessMatrix(edge, sequence))
    .reduce((acc, cur) => math.add(acc, cur) as any, math.zeros(nodes.length*2, nodes.length*2));

  const nodalFreedomVariables = sequencePlus.filter(s => s.link);
  const nodalNotFreedomVariables = sequencePlus.filter(s => !s.link);

  const nodalFreedomIndexes = nodalFreedomVariables.map(n => n.index)
  const nodalNotFreedomIndexes = nodalNotFreedomVariables.map(n => n.index)

  const fa = nodalNotFreedomVariables.map(n => n.force);
  const kaa = reduceMatrix(nodalNotFreedomIndexes, nodalNotFreedomIndexes, stiffnessMatrix);
  const ua = math.multiply(math.inv(kaa), fa);

  const kba = reduceMatrix(nodalFreedomIndexes, nodalNotFreedomIndexes, stiffnessMatrix);
  const fb = math.multiply(kba, ua)

  const forces = math.concat(fa, fb) as math.Matrix // TODO: para alguns exemplos nao e so contacenar
  const u = math.concat(ua, math.zeros(nodalFreedomVariables.length)) as math.Matrix;
  const fbx = edges.map(edge => displacementsToForce(u, sequence, edge));

  updateTrellis(treillis, fbx, sequence, forces);

  return treillis
}

function updateTrellis(treillis: MutableWeightedGraph<TreillisNode, TreillisEdge>, fbx: number[], sequence: matrixSequenceInfo[], forces: math.Matrix) {
  treillis.edges().forEach((edge, i) => edge.value.forceModule = -fbx[i]);
  sequence.forEach((s, i) => {
    if (s.node.force && s.node.force[s.posKey]) {
      return;
    }

    if (s.node.hiddenForce == null) {
      s.node.hiddenForce = {};
    }
    s.node.hiddenForce[s.posKey] = forces.subset(math.index(i)) as unknown as number;
  });
}

function displacementsToForce(u: math.Matrix, sequence: matrixSequenceInfo[], edge: BasicEdge<TreillisNode, TreillisEdge>) {
  const kb = localSystemStiffnessMatrix(edge);
  const t = transformationMatrixFromGlobalToLocalSystem(edge);
  const l = sparseMatrix(edge, sequence);

  let fb = math.multiply(l, u);
  fb = math.multiply(t, fb);
  fb = math.multiply(kb, fb);

  return fb.subset(math.index(0)) as unknown as number;
}

export function solveTreillis(treillis: MutableWeightedGraph<TreillisNode, TreillisEdge>): MutableWeightedGraph<TreillisNode, TreillisEdge> | null {
  try {
    solveStiffnessMatrix(treillis);
  } catch(e) {
    console.error(e);
    return null;
  }
  return treillis;
}
