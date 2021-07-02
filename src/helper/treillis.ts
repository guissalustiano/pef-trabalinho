import { UndirectedGraph } from "graphology";
import { Vector2d } from "konva/lib/types";

export type TreillisNode = {
  pos: Vector2d,
  force?: Vector2d,
  link?: 'apoio' | 'engaste'
}

export type TreillisEdge = {
  forceModule?: number,
}

export function solveTreillis(treillis: UndirectedGraph<TreillisNode>): UndirectedGraph<TreillisNode, TreillisEdge> {
  return treillis;
}
