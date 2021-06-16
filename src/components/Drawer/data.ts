import { UndirectedGraph } from "graphology";
import { Vector2d } from "konva/lib/types";

type NodeMetadata = {
  pos: Vector2d,
  force?: Vector2d,
  link?: 'apoio' | 'engaste'
}

export const generateData = () => {
  const graph = new UndirectedGraph<NodeMetadata>();

  graph.addNode('A', {
    pos: {
      x: -200,
      y: -200
    },
  });
  graph.addNode('B', {
    pos: {
      x: 200,
      y: -200
    },
  });
  graph.addNode('C', {
    pos: {
      x: 0,
      y: -100
    },
  });
  graph.addNode('D', {
    pos: {
      x: 100,
      y: -100
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
      x: 100,
      y: 0
    },
    force: {
      x: -100,
      y: 100,
    }
  });
  graph.addNode('G', {
    pos: {
      x: -100,
      y: 100
    }
  });
  graph.addNode('H', {
    pos: {
      x: 300,
      y: 100
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
