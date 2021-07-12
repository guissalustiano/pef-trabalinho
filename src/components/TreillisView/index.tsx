import { Stage, Layer } from 'react-konva';
import { TreillisEdge, TreillisNode } from "../../helper/treillis";
import { MutableWeightedGraph } from "graphs-for-js";

import "./style.css";
import TreillisViewNode from '../TreillisViewNode';
import TreillisViewEdge from '../TreillisViewEdge';
import TreillisViewForce from '../TreillisViewForce';

type TreillisViewParams = {
  treillis: MutableWeightedGraph<TreillisNode, TreillisEdge>,
  width?: number,
  height?: number,
}

const TreillisView = ({ treillis, width, height }: TreillisViewParams) => {
  const widthFinal = width ?? window.innerWidth;
  const heightFinal = height ?? window.innerHeight;
  const scale = 50;
  const maxEdgeforce = Math.max(...treillis.edges().map(e => e.value.forceModule))

  return (
    <Stage width={widthFinal} height={heightFinal} className="treillis-view-wrapper" scaleX={scale} scaleY={scale}>
      <Layer offsetX={-5} offsetY={-5}>
        {treillis.nodes().filter(node => node.force !== undefined).map(node => (
          <TreillisViewForce node={node} scale={scale} />))}

        {treillis.edges()
          .map((edge) => (<TreillisViewEdge edge={edge} scale={scale} valueScale={maxEdgeforce} />))}

        {treillis.nodes()
          .map(node => (<TreillisViewNode node={node} scale={scale} />))}
      </Layer>
    </Stage>
  );
};

export default TreillisView;
