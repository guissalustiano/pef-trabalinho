import React from 'react';
import { Stage, Layer, Circle, Line, Arrow, Text } from 'react-konva';
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
  const [text, setText] = React.useState("batata");
  // const setAndCalcTreillis = (treillis: MutableUnweightedGraph<TreillisNode, TreillisEdge>) => setTreillis(solveTreillis(treillis));

  return (
    <Stage width={width} height={height} className="Drawer-wrapper">
      <Layer><Text text={text} fontSize={32}/></Layer>
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
              onMouseOver={() => setText(`tração: ${edge.value.forceModule.toFixed(2)}`)}
              points={[pos1.x, pos1.y, pos2.x, pos2.y].map(x => x * posFactor)}
              strokeWidth={5}
              stroke='black'
            />
          );
        })}

        {treillis.nodes().map(node => {
          return (
            <Circle
              key={Math.random()}
              onMouseOver={() => setText(`fx: ${node.hiddenForce?.x?.toFixed() ?? 0} | fy: ${node.hiddenForce?.y?.toFixed() ?? 0}`)}
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
