import { Graph } from "graphs-for-js";
import { TreillisEdge, TreillisNode } from "../../helper/treillis";

export const generateTreillisSample = () => {
  const graph = new Graph<TreillisNode, TreillisEdge>()
  .keyFn(i => i.id).undirected.weighted()

  const nodeA = {
    id: 'A',
    pos: {
      x: 2.5,
      y: -2.5
    },
    force: {
      x: 5,
      y: 10,
    }
  }
  const nodeB = {
    id: 'B',
    pos: {
      x: -2.5,
      y: -2.5
    },
    link: { y: true }
  };
  const nodeC = {
    id: 'C',
    pos: {
      x: -2.5,
      y: 2.5
    },
    link: { x: true, y: true }
  };
  const nodeD = {
    id: 'D',
    pos: {
      x: 2.5,
      y: 2.5
    },
    link: { x: true, y: true }
  };

  graph.insert(nodeA)
  graph.insert(nodeB)
  graph.insert(nodeC)
  graph.insert(nodeD)

  graph.connect(nodeB, nodeA, {});
  graph.connect(nodeD, nodeA, {});
  graph.connect(nodeC, nodeD, {});
  graph.connect(nodeC, nodeB, {});
  graph.connect(nodeC, nodeA, {});
  graph.connect(nodeD, nodeB, {});

  console.log(graph)

  return graph
}
