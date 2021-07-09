import React, {useState } from "react";
import { TreillisEdge, TreillisNode } from "../../helper/treillis";
import { MutableWeightedGraph } from "graphs-for-js";

import * as S from "./styles";
import { useMemo } from "react";
import TableNodes from "../TableNodes";
import generateTrellisData from "./GenerateTrellisData";

type TreillisTableParams = {
  onChange: (value: MutableWeightedGraph<TreillisNode, TreillisEdge>) => void;
};

const dataInitial = [
  {
    id: "A",
    pos: {
      x: "2.5",
      y: "-2.5",
    },
    link: "simples",
    force: {
      x: "",
      y: "",
    },
    connections: [],
  },
];

export interface DataProps {
  id: string;
  pos: {
    x: string;
    y: string;
  };
  connections: string[];
  link?: string;
  force?: {
    x: string;
    y: string;
  };
}

const TreillisTable = ({ onChange }: TreillisTableParams) => {
  const columns = useMemo(
    () => [
      {
        Header: "Propriedades do Nó",
        columns: [
          {
            Header: "Nome",
            accessor: "id",
          },
          {
            Header: "Posição X",
            accessor: "pos.x",
          },
          {
            Header: "Posição Y",
            accessor: "pos.y",
          },
          {
            Header: "Vínculo",
            accessor: "link",
          },
          {
            Header: "Conexões",
            accessor: "connections",
          },
        ],
      },
      {
        // Second group - Details
        Header: "Força Externa",
        // Second group columns
        columns: [
          {
            Header: "Componente horizontal",
            accessor: "force.x",
          },
          {
            Header: "Componente vertical",
            accessor: "force.y",
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = useState(dataInitial);

  const updateMyData = (rowIndex, columnId, value) => {
    if (columnId.includes('.')) {
    const attributtes = columnId.split('.');
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [attributtes[0]]: {...old[rowIndex][attributtes[0]], [attributtes[1]]: value},
          };
        }
        return row;
      })
    );}
    else {
      setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }))}
  };

  const addNewNode = () => {
    setData((old) => [
      ...old,
      {
        id: "A",
        pos: {
          x: "0",
          y: "0",
        },
        link: "nenhum",
        force: {
          x: "",
          y: "",
        },
        connections: [],
      },
    ]);
  }

  return (
    <S.TableBlock>
      <TableNodes columns={columns} data={data} updateMyData={updateMyData} />
      <button onClick={addNewNode}>Adicionar nó</button>
      <button onClick={() => onChange(generateTrellisData(data))}>Teste </button>
    </S.TableBlock>
  );
};

export default TreillisTable;
