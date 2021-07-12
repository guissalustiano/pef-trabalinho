import { Line } from 'react-konva';
import { TreillisNode } from "../../helper/treillis";

import "./style.css";

type TreillisViewLinkParams = {
  node: TreillisNode,
  scale?: number,
}

const lineWidth = 1;
const y1 = 0.5;
const y2 = y1 + 0.3;
const dx = lineWidth/2;

const TreillisViewLink = ({ node, scale = 1 }: TreillisViewLinkParams) => {
  

  const apoio = (<Line
    key={node.id + "A"}
    x={node.pos.x}
    y={node.pos.y}
    points={[-dx, y1+0.2, dx, y1+0.2]}
    closed
    stroke="black"
    strokeWidth={5 / scale} />)

  const engaste = (<>
  <Line
    key={node.id + "E1"}
    x={node.pos.x-dx/2}
    y={node.pos.y}
    points={[0, y1, 0.1, y2]}
    closed
    stroke="black"
    strokeWidth={5 / scale} />

  <Line
    key={node.id + "E2"}
    x={node.pos.x}
    y={node.pos.y}
    points={[0, y1, 0.1, y2]}
    closed
    stroke="black"
    strokeWidth={5 / scale} />

    <Line
      key={node.id + "E3"}
      x={node.pos.x + dx/2}
      y={node.pos.y}
      points={[0, y1, 0.1, y2]}
      closed
      stroke="black"
      strokeWidth={5 / scale} />
  </>)
  return (<>
    <Line
      key={node.id + "L"}
      x={node.pos.x}
      y={node.pos.y}
      points={[-dx+0.1, y1, 0, 0, dx-0.1, y1]}
      closed
      stroke="black"
      strokeWidth={5 / scale} />

    {!node.link?.x ? apoio : engaste}
  </>);
}




export default TreillisViewLink;
