import { Circle } from 'react-konva';
import { TreillisNode } from "../../helper/treillis";

import "./style.css";

type TreillisViewNodeParams = {
  node: TreillisNode,
  scale?: number,
}

const TreillisViewNode = ({ node, scale=1 }: TreillisViewNodeParams) => (
  <Circle
    key={node.id}
    x={node.pos.x }
    y={node.pos.y}
    radius={10/scale}
    fill="purple" />
)




export default TreillisViewNode;
