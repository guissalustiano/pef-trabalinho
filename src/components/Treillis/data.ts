import { UndirectedGraph } from "graphology";
import { TreillisNode } from "../../helper/treillis";

export const generateTreillisSample = () => {
  const graph = new UndirectedGraph<TreillisNode>();

  graph.addNode('A', {
    pos: {
      x: -2,
      y: -2
    },
  });
  graph.addNode('B', {
    pos: {
      x: 2,
      y: -2
    },
  });
  graph.addNode('C', {
    pos: {
      x: 0,
      y: -1
    },
  });
  graph.addNode('D', {
    pos: {
      x: 1,
      y: -1
    },
  });
  graph.addNode('E', {
    pos: {
      x: 0,
      y: 0
    },
  });
  graph.addNode('F', {
    pos: {
      x: 1,
      y: 0
    },
    force: {
      x: -1,
      y: 1,
    }
  });
  graph.addNode('G', {
    pos: {
      x: -1,
      y: 1
    }
  });
  graph.addNode('H', {
    pos: {
      x: 3,
      y: 1
    },
  });

  graph.addEdge('A', 'C');
  graph.addEdge('D', 'B');
  graph.addEdge('C', 'D');
  graph.addEdge('A', 'G');
  graph.addEdge('G', 'C');
  graph.addEdge('C', 'E');
  graph.addEdge('C', 'F');
  graph.addEdge('F', 'D');
  graph.addEdge('D', 'H');
  graph.addEdge('H', 'B');
  graph.addEdge('G', 'E');
  graph.addEdge('E', 'F');
  graph.addEdge('F', 'H');

  return graph
}
