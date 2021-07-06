import React from 'react';
import { Stage, Layer, Circle, Line, Arrow, Text } from 'react-konva';
import { TreillisEdge, TreillisNode } from "../../helper/treillis";
import { MutableWeightedGraph } from "graphs-for-js";

import "./style.css";

const posFactor = 72;
const forceFactor = 16;

type TreillisViewParams = {
  treillis: MutableWeightedGraph<TreillisNode, TreillisEdge>,
  width?: number,
  height?: number,
}

const TreillisView = ({ treillis, width, height }: TreillisViewParams) => {
  const [text, setText] = React.useState("batata");
  const widthFinal = width ?? window.innerWidth;
  const heightFinal = height ?? window.innerHeight;

  return (
    <Stage width={widthFinal} height={heightFinal} className="treillis-view-wrapper">
      <Layer><Text text={text} fontSize={32} /></Layer>
      <Layer offsetX={-widthFinal / 2} offsetY={-heightFinal / 2}>
        {treillis.nodes().filter(node => node.force !== undefined).map(node => (
          <Arrow
            key={Math.random()}
            x={node.pos.x * posFactor}
            y={node.pos.y * posFactor}
            points={[0, 0, node!.force!.x, node!.force!.y].map(x => x * forceFactor)}
            stroke="red"
            fill="red"
            strokeWidth={5}
          />))}

        {treillis.edges().map((edge) => {
          const pos1 = edge.source.pos
          const pos2 = edge.target.pos
          const textPosX = (pos1.x + (pos2.x - pos1.x)/3)*posFactor;
          const textPosY = (pos1.y + (pos2.y - pos1.y)/3)*posFactor
          return (
            <>
            <Line
              key={Math.random()} // TODO: fix this
              onMouseOver={() => setText(`tração: ${edge.value.forceModule?.toFixed(2)}`)}
              points={[pos1.x, pos1.y, pos2.x, pos2.y].map(x => x * posFactor)}
              strokeWidth={5}
              stroke={edge.value.forceModule < 0 ? 'green' : 'blue'}
            />
            <Text x={textPosX} y={textPosY} text={`${edge.value.forceModule.toFixed(2)} N`} fontSize={16}/>
            </>
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
              fill="black" />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default TreillisView;
