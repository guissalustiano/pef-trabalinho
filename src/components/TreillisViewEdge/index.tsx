import { ValueEdge } from 'graphs-for-js';
import { Text, Line } from 'react-konva';
import { lerpColor } from '../../helper/color';
import { TreillisEdge, TreillisNode } from "../../helper/treillis";

import "./style.css";

type TreillisViewEdgeParams = {
  edge: ValueEdge<TreillisNode, TreillisEdge>,
  scale?: number,
  valueScale?: number,
}

const conpressColor = "#0000ff"
const tractionColor = "#008000"

const TreillisViewEdge = ({ edge, scale = 1, valueScale=24 }: TreillisViewEdgeParams) => {
  const sp = edge.source.pos;
  const tp = edge.target.pos;

  const textPos = {
    x: sp.x + 2*(tp.x - sp.x)/3,
    y: sp.y + 2*(tp.y - sp.y)/3,
    rot: Math.atan((sp.y - tp.y)/(sp.x- tp.x)) * 180/Math.PI
  }

  const valueToColor = (value) => lerpColor(conpressColor, tractionColor, (value + valueScale)/(2*valueScale))

  return (
    <>
      <Line
        key={edge.source.id + edge.target.id}
        points={[sp.x, sp.y, tp.x, tp.y]}
        strokeWidth={5 / scale}
        stroke={valueToColor(edge.value.forceModule)} />

        <Text
          x={textPos.x}
          y={textPos.y}
          rotation={textPos.rot}
          text={`${edge.value.forceModule.toFixed(2)} N`}
          fontSize={16/scale}/>
    </>
  );
}




export default TreillisViewEdge;
