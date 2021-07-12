import { Circle, Text } from "react-konva";
import { TreillisNode } from "../../helper/treillis";

import "./style.css";

type TreillisViewNodeParams = {
  node: TreillisNode;
  scale?: number;
};

const TreillisViewNode = ({ node, scale = 1 }: TreillisViewNodeParams) => {
  const r = 10 / scale;
  return (
    <>
      <Circle
        key={node.id}
        x={node.pos.x}
        y={node.pos.y}
        radius={r}
        fill="purple"
      />

      <Text
        x={node.pos.x - 3 * r}
        y={node.pos.y - 3 * r}
        text={node.id}
        fontSize={32 / scale}
      />
    </>
  );
};

export default TreillisViewNode;
