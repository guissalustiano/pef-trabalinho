import { Stage, Layer } from 'react-konva';
import { TreillisEdge, TreillisNode } from "../../helper/treillis";
import { MutableWeightedGraph } from "graphs-for-js";

import "./style.css";
import TreillisViewNode from '../TreillisViewNode';
import TreillisViewEdge from '../TreillisViewEdge';
import TreillisViewForce from '../TreillisViewForce';
import { useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import TreillisViewLink from '../TreillisViewLink';

type TreillisViewParams = {
  treillis: MutableWeightedGraph<TreillisNode, TreillisEdge>,
  width?: number,
  height?: number,
}

const TreillisView = ({ treillis, width, height }: TreillisViewParams) => {
  const widthFinal = width ?? window.innerWidth;
  const heightFinal = height ?? window.innerHeight;

  const maxEdgeforce = Math.max(...treillis.edges().map(e => e.value.forceModule))

  const [scale, setScale] = useState(50);
  const [position, setPosition] = useState({x: widthFinal/2, y: heightFinal/2})
  const scaleBy = 1.01;

  const onWhellScale = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale(newScale);

    var newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    
    setPosition(newPos);
  }

  return (
    <Stage
      width={widthFinal}
      height={heightFinal}
      className="treillis-view-wrapper"
      scaleX={scale}
      scaleY={scale}
      onWheel={onWhellScale}
      x={position.x}
      y={position.y}
      >
      <Layer>
      {treillis.nodes().filter(node => node.link !== undefined).map(node => (
          <TreillisViewLink node={node} scale={scale} />))}

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
