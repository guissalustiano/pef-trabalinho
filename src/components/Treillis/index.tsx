import React from 'react';
import { Stage, Layer, Circle, Line, Arrow } from 'react-konva';
import { generateTreillisSample } from './data';
import { solveTreillis } from "../../helper/treillis";
import { TreillisNode } from "../../helper/treillis";
import { UndirectedGraph } from "graphology";


import "./style.css"
import { NodeKey } from 'graphology-types';
import Konva from 'konva';

const width = 700;
const height = 500;
const posFactor = 100;
const forceFactor = 70;

const initialState = solveTreillis(generateTreillisSample());

const Drawer = () => {
  const [treillis, setTreillis] = React.useState(initialState);
  const setAndCalcTreillis = (treillis: UndirectedGraph<TreillisNode>) => setTreillis(solveTreillis(treillis));

  const handleNodeDrag = (nodeId: NodeKey, e: Konva.KonvaEventObject<DragEvent>) => {
    treillis.mergeNodeAttributes(nodeId, { pos: { x: e.target.x()/posFactor, y: e.target.y()/posFactor } });

    // Quando setamos a mesma referencia o setState acha que nada mudou por isso nao desenha o componente novamente, mas os valores mudaram
    // para resolver isso estamos copiando e gerando uma nova treliça, entretanto acabamos gerando um novo elemento de forma desnecessaria
    setAndCalcTreillis(treillis.copy()); //TODO: improve
  };

  const nodes = Array.from(treillis.nodeEntries()).map(([id, atributes]) => ({ id, ...atributes }));
  return (
    <Stage width={width} height={height} className="Drawer-wrapper">
      <Layer offsetX={-width / 2} offsetY={-height / 2}>
        {nodes.filter(node => node.force !== undefined).map(node => (
          <Arrow
            x={node.pos.x * posFactor}
            y={node.pos.y * posFactor}
            points={[0, 0, node!.force!.x, node!.force!.y].map(x => x * forceFactor)}
            stroke="black"
            fill="black"
          />))}

        {treillis.edges().map((edge) => {
          const [node1, node2] = treillis.extremities(edge)
          const pos1 = treillis.getNodeAttributes(node1).pos
          const pos2 = treillis.getNodeAttributes(node2).pos
          return (
            <Line
              points={[pos1.x, pos1.y, pos2.x, pos2.y].map(x => x * posFactor)}
              stroke='black'
            />
          );
        })}

        {nodes.map(node => {
          return (
            <Circle
              key={node.id} id={node.id}
              x={node.pos.x * posFactor}
              y={node.pos.y * posFactor}
              draggable
              onDragMove={(e) => handleNodeDrag(node.id, e)}
              radius={10}
              fill="red" />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Drawer;
