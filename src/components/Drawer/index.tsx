import React from 'react';
import { Stage, Layer, Circle, Line, Arrow } from 'react-konva';
import { generateData } from './data';

import "./style.css"

const width = 700;
const height = 500;
const posFactor = 100;
const forceFactor = 70;

const Drawer = () => {
  const graph = generateData();
  const nodes = Array.from(graph.nodeEntries()).map(([id, atributes]) => ({ id, ...atributes }));
  return (
    <Stage width={width} height={height} className="Drawer-wrapper">
      <Layer offsetX={-width / 2} offsetY={-height / 2}>
        { nodes.filter(node => node.force != undefined).map(node => (
        <Arrow
          x={node.pos.x * posFactor}
          y={node.pos.y * posFactor}
          points={[0, 0, node!.force!.x * forceFactor, node!.force!.y * forceFactor]}
          stroke="black"
          fill="black"
        />))
        }
        {graph.edges().map((edge) => {
          const [node1, node2] = graph.extremities(edge)
          const pos1 = graph.getNodeAttributes(node1).pos
          const pos2 = graph.getNodeAttributes(node2).pos
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
              radius={10}
              fill="red" />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Drawer;
