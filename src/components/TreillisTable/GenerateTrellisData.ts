import { TreillisEdge, TreillisNode } from "../../helper/treillis";

import { Graph } from "graphs-for-js";

const linksProps = {
  simples: { y: true },
  completo: { x: true, y: true },
};

export interface DataProps {
  id: string;
  pos: {
    x: string;
    y: string;
  };
  connections: string[]
  link?: string;
  force?: {
    x: string;
    y: string;
  };
}


const generateTrellisData = (data: DataProps[]) => {
  const graph = new Graph<TreillisNode, TreillisEdge>()
    .keyFn((i) => i.id)
    .undirected.weighted();

  data.forEach((element) => {
    const node: TreillisNode = {
      id: element.id,
      pos: {
        x: Number(element.pos.x),
        y: Number(element.pos.y),
      },
    };
    

    if (!isNaN(Number.parseFloat(element.force.x)) && !isNaN(Number.parseFloat(element.force.y))) {
      node.force = { x: Number(element.force.x), y: Number(element.force.y) };
    }

    if (element.link !== "nenhum") {
      node.link = linksProps[element.link];
    }
    
    graph.insert(node);
  });

  data.forEach((element) => {
    const sourceNodeId = element.id;
    const allNodes = graph.nodes();
    const sourceNode  = allNodes.find((node) => node.id === sourceNodeId);
    console.log(element.connections.length);
    if (element.connections.length !== 0) {
    element.connections.forEach((targetNodeId) => {
      console.log(sourceNodeId, targetNodeId);
      const targetNode = allNodes.find((node) => node.id === targetNodeId);
      graph.connect(sourceNode, targetNode, {});
    })}
  })

  console.log(graph);

  return graph;
};

export default generateTrellisData;
