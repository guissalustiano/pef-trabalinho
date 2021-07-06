import React from 'react';
import { TreillisEdge, TreillisNode } from "../../helper/treillis";
import { MutableWeightedGraph } from "graphs-for-js";

import "./style.css";

type TreillisTableParams = {
  onChange: (value: MutableWeightedGraph<TreillisNode, TreillisEdge>) => void,
}

const TreillisTable = ({ onChange }: TreillisTableParams) => {
  return (<h3>Tabea com o formulario</h3>);
};

export default TreillisTable;
