import { UndirectedGraph } from "graphology";
import { TreillisNode } from "../../helper/treillis";

export const generateTreillisSample = () => {
  const graph = new UndirectedGraph<TreillisNode>();

  graph.addNode('A', {
    pos: {
      x: 2.5,
      y: -2.5
    },
    force: {
      x: 5,
      y: 10,
    }
  });
  graph.addNode('B', {
    pos: {
      x: -2.5,
      y: -2.5
    },
    link: { y: true }
  });
  graph.addNode('C', {
    pos: {
      x: -2.5,
      y: 2.5
    },
    link: { x: true, y: true }
  });
  graph.addNode('D', {
    pos: {
      x: 2.5,
      y: 2.5
    },
    link: { x: true, y: true }
  });

  graph.addEdge('B', 'A');
  graph.addEdge('D', 'A');
  graph.addEdge('C', 'D');
  graph.addEdge('C', 'B');
  graph.addEdge('C', 'A');
  graph.addEdge('D', 'B');

  return graph
}
