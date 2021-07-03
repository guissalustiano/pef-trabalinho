import { UndirectedGraph } from "graphology";
import { Vector2d } from "konva/lib/types";
import nj from "numjs";

(nj as any).config.printThreshold = 28;

export type TreillisNode = {
  pos: Vector2d,
  force?: Vector2d,
  link?: {x?: boolean, y?: boolean},
}

export type TreillisEdge = {
  forceModule?: number,
}

const zip = <T, U>(a: Array<T>, b: Array<U>) => a.map((k, i) => [k, b[i]]);

function distance(p1: Vector2d, p2: Vector2d) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

// https://youtu.be/aDPaofpQt5g?t=347
function memberStiffnessMatrix(treillis: UndirectedGraph<TreillisNode>, edgeKey: string) {
  const [node1, node2] = treillis.extremities(edgeKey);
  const pos1 = treillis.getNodeAttributes(node1).pos;
  const pos2 = treillis.getNodeAttributes(node2).pos;

  const width = distance(pos1, pos2);
  const lambdaX = (pos1.x - pos2.x) / width;
  const lambdaY = (pos1.y - pos2.y) / width;

  let matrix = nj.array([
    [lambdaX * lambdaX, lambdaX * lambdaY, -lambdaX * lambdaX, -lambdaX * lambdaY],
    [lambdaX * lambdaY, lambdaY * lambdaY, -lambdaX * lambdaY, -lambdaY * lambdaY],
    [-lambdaX * lambdaX, -lambdaX * lambdaY, lambdaX * lambdaX, lambdaX * lambdaY],
    [-lambdaX * lambdaY, -lambdaY * lambdaY, lambdaX * lambdaY, lambdaY * lambdaY]])

  matrix = matrix.multiply(1 / width);

  return { edgeKey, matrix }
}

function sparseMatrix(keys: number[], len: number) {
  const lines = keys.map(k => {
    const line = nj.zeros(len);
    line.set(k, 1)
    return line;
  })
  return nj.stack(lines) as unknown as nj.NdArray<number[]> // Se fosse rust funcionava
}

// based in
// https://edisciplinas.usp.br/pluginfile.php/4109576/mod_resource/content/1/Notas%20de%20aula-%20v2.pdf
// https://www.youtube.com/watch?v=aDPaofpQt5g
function sparseStiffnessMatrix(treillis: UndirectedGraph<TreillisNode>, { edgeKey, matrix }: { edgeKey: string, matrix: nj.NdArray<number[]> }) {
  const [node1, node2] = treillis.extremities(edgeKey);
  const nodes = treillis.nodes();
  const node1Index = nodes.indexOf(node1);
  const node2Index = nodes.indexOf(node2);

  // precisamos alocar uma linha para cada grau de liberdade de cada ponto, ou seja
  // teremos uma matrix de 2*qtd_nos onde as linhas pares serao forçs no eixo X e linhas pares forças no eixo impar
  const node1IndexX = node1Index * 2;
  const node1IndexY = node1Index * 2 + 1;
  const node2IndexX = node2Index * 2;
  const node2IndexY = node2Index * 2 + 1;

  const sparcematrix = sparseMatrix([node1IndexX, node1IndexY, node2IndexX, node2IndexY], 2 * nodes.length)

  const result = nj.dot(sparcematrix.transpose(), nj.dot(matrix, sparcematrix));
  return result;
}

function reduceMatrix(indices: number[], matrix: nj.NdArray<number[]>) {
  const len = indices.length
  const rmatrix = nj.zeros([len, len])
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const e = matrix.get(indices[i], indices[j]) as unknown as number;
      rmatrix.set(i, j, e)
    }
  }
  return rmatrix;
}

function nodalCalcs(treillis: UndirectedGraph<TreillisNode>, stiffnessMatrix: nj.NdArray<number[]>) {
  const nodes = Array.from(treillis.nodeEntries()).map(([id, atributes]) => ({ id, ...atributes }));
  const nodalVariables = nodes
    .flatMap((node) => {
      const linkX = node.link?.x ?? false;
      const partX = {
        id: node.id,
        force: linkX ? null : (node.force?.x ?? 0),
        link: linkX,
      }

      const linkY = node.link?.y ?? false;
      const partY = {
        id: node.id,
        force: linkY ? null : (node.force?.y ?? 0),
        link: linkY,
      }

    return [partX, partY]
  })
  .map((obj, index) => ({
    index, ...obj
  }))

  const nodalFreedomVariables = nodalVariables.filter(n => n.link);
  const nodalNotFreedomVariables = nodalVariables.filter(n => !n.link);

  const fa = nj.array(nodalNotFreedomVariables.map(n => n.force));
  const kaa = reduceMatrix(nodalNotFreedomVariables.map(n => n.index),stiffnessMatrix);

  console.log(fa.toString())
  console.log(kaa.toString())
}

function solveStiffnessMatrix(treillis: UndirectedGraph<TreillisNode>) {
  const edges = treillis.edges();
  const stiffnessMatrix = edges
    .map(k => memberStiffnessMatrix(treillis, k))
    .map(sm => sparseStiffnessMatrix(treillis, sm))
    .reduce((acc, cur) => acc.add(cur));

  console.log(stiffnessMatrix.toString());

  nodalCalcs(treillis, stiffnessMatrix);
}

export function solveTreillis(treillis: UndirectedGraph<TreillisNode>): UndirectedGraph<TreillisNode, TreillisEdge> {
  solveStiffnessMatrix(treillis);
  return treillis;
}
