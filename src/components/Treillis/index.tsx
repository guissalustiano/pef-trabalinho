import React from 'react';
import { Stage, Layer, Circle, Line, Arrow } from 'react-konva';
import { generateTreillisSample } from './data';
import { solveTreillis } from "../../helper/treillis";

import "./style.css";

const width = 700;
const height = 500;
const posFactor = 72;
const forceFactor = 16;

const initialState = solveTreillis(generateTreillisSample());

const Drawer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [treillis, setTreillis] = React.useState(initialState);
  // const setAndCalcTreillis = (treillis: MutableUnweightedGraph<TreillisNode, TreillisEdge>) => setTreillis(solveTreillis(treillis));

  return (
    <Stage width={width} height={height} className="Drawer-wrapper">
      <Layer offsetX={-width / 2} offsetY={-height / 2}>
        {treillis.nodes().filter(node => node.force !== undefined).map(node => (
          <Arrow
            key={Math.random()}
            x={node.pos.x * posFactor}
            y={node.pos.y * posFactor}
            points={[0, 0, node!.force!.x, node!.force!.y].map(x => x * forceFactor)}
            stroke="black"
            fill="black"
          />))}

        {treillis.edges().map((edge) => {
          const pos1 = edge.source.pos
          const pos2 = edge.target.pos
          return (
            <Line
              key={Math.random()} // TODO: fix this
              points={[pos1.x, pos1.y, pos2.x, pos2.y].map(x => x * posFactor)}
              stroke='black'
            />
          );
        })}

        {treillis.nodes().map(node => {
          return (
            <Circle
              key={Math.random()}
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
