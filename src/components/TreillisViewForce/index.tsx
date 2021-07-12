import { distance } from 'mathjs';
import { Text, Arrow } from 'react-konva';
import { TreillisNode } from "../../helper/treillis";

import "./style.css";

type TreillisViewForceParams = {
  node: TreillisNode,
  scale?: number,
}

const TreillisViewForce = ({ node, scale = 1 }: TreillisViewForceParams) => {
  const sp = node.pos
  const tp = {
    x: node!.force!.x ?? 0,
    y: node!.force!.y ?? 0
  }

  const textPos = {
    x: sp.x + tp.x/2,
    y: sp.y + tp.y/2,
    rot: Math.atan(tp.y/tp.x) * 180/Math.PI
  }

  const forceModule = distance([0, 0], [tp.x, tp.y])

  return (
    <>

    <Arrow
      key={node.id}
      x={sp.x}
      y={sp.y}
      points={[0, 0, tp.x, tp.y]}
      stroke="red"
      fill="red"
      strokeWidth={5 / scale}
      pointerLength={20 / scale}
      pointerWidth={10 / scale} />

      <Text
          x={textPos.x}
          y={textPos.y}
          rotation={textPos.rot}
          text={`${forceModule.toFixed(2)} N`}
          fill="red"
          fontSize={16/scale}/>
    </>
  );
}




export default TreillisViewForce;
