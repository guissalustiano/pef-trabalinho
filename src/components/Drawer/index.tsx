import React from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import { generateData } from './data';

import "./style.css"

const Drawer = () => {
  const width = 700;
  const height = 500;
  const graph = generateData();
  return (
    <Stage width={width} height={height} className="Drawer-wrapper">
      <Layer offsetX={-width / 2} offsetY={-height / 2}>
        {graph.edges().map((edge) => {
          const [node1, node2] =  graph.extremities(edge)
          const pos1 =  graph.getNodeAttributes(node1).pos
          const pos2 =  graph.getNodeAttributes(node2).pos
          return (
            <Line 
              points={[pos1.x, pos1.y, pos2.x, pos2.y]}
              stroke='black'
            />
          );
        })}
        {graph.nodes().map((node) => {
          const nodeAtributes =  graph.getNodeAttributes(node)
          return (
            <Circle
              key={node} id={node}
              x={nodeAtributes.pos.x} y={nodeAtributes.pos.y}
              radius={10}
              fill="red" />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Drawer;
