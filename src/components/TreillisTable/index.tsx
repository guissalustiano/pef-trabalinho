import React from "react";
import { TreillisEdge, TreillisNode } from "../../helper/treillis";
import { MutableWeightedGraph } from "graphs-for-js";

import * as S from "./styles";
import { useMemo } from "react";
import TableNodes from "../TableNodes";

const dataInitial = [
  {
    id: "A",
    pos: {
      x: 1,
      y: 2,
    },
    link: "nenhum",
    force: {
      x: "0",
      y: "0",
    },
  },
];

type TreillisTableParams = {
  onChange: (value: MutableWeightedGraph<TreillisNode, TreillisEdge>) => void;
};

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

  const [data, setData] = React.useState(dataInitial);

  const updateMyData = (rowIndex, columnId, value) => {
    console.log(rowIndex, columnId, value);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const addNewNode = () => {
    setData((old) => [
      ...old,
      {
        id: "A",
        pos: {
          x: 1,
          y: 2,
        },
        link: "nenhum",
        force: {
          x: "0",
          y: "0",
        },
      },
    ]);
  };

  return (
    <S.TableBlock>
      <h3>Tabea com o formulario</h3>
      <TableNodes updateMyData={updateMyData} columns={columns} data={data} />
      <button onClick={addNewNode}>Adicionar nó</button>
    </S.TableBlock>
  );
};

export default TreillisTable;
