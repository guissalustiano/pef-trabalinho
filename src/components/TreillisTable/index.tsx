import React, { useState } from "react";
import { TreillisEdge, TreillisNode } from "../../helper/treillis";
import { MutableWeightedGraph } from "graphs-for-js";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import * as S from "./styles";
import { useMemo } from "react";
import TableNodes from "../TableNodes";
import generateTrellisData from "./GenerateTrellisData";

type TreillisTableParams = {
  onChange: (value: MutableWeightedGraph<TreillisNode, TreillisEdge>) => void;
};

const nodesName = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const dataInitial = [
  {
    id: "A",
    pos: {
      x: "2.5",
      y: "-2.5",
    },
    link: "nenhum",
    force: {
      x: "3",
      y: "5",
    },
    connections: ["B", "C"],
  },
  {
    id: "B",
    pos: {
      x: "-2.5",
      y: "-2.5",
    },
    link: "simples",
    force: {
      x: "",
      y: "",
    },
    connections: ["C", "D"],
  },
  {
    id: "C",
    pos: {
      x: "-2.5",
      y: "2.5",
    },
    force: {
      x: "",
      y: "",
    },
    link: "completo",
    connections: ["D"],
  },
  {
    id: "D",
    pos: {
      x: "2.5",
      y: "2.5",
    },
    force: {
      x: "",
      y: "",
    },
    link: "completo",
    connections: ["A"],
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

  const deleteButtonsArray = data.map((element, index) => {
    return (
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        style={{ marginBottom: 20 }}
        onClick={() => {
          data.splice(index, 1);
          const newData = [...data];
          setData(newData);
        }}
      >
        remover
      </Button>
    );
  });

  const updateMyData = (rowIndex, columnId, value) => {
    if (columnId.includes(".")) {
      const attributtes = columnId.split(".");
      setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [attributtes[0]]: {
                ...old[rowIndex][attributtes[0]],
                [attributtes[1]]: value,
              },
            };
          }
          return row;
        })
      );
    } else {
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
    }
  };

  const addNewNode = () => {
    if (data.length < 12)
      setData((old) => [
        ...old,
        {
          id: nodesName[old.length],
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
  };

  const restartTrellis = () => {
    setData(dataInitial);
  };

  console.log(data);

  return (
    <S.TableBlock>
      <S.ButtonsContainer>
        <TableNodes columns={columns} data={data} updateMyData={updateMyData} />
        <S.DeleteButtonsContainer>
          {deleteButtonsArray}
        </S.DeleteButtonsContainer>
      </S.ButtonsContainer>
      <S.ButtonsContainer>
        <Button
          onClick={addNewNode}
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#3A86FF", width: 150 }}
        >
          Adicionar nó
        </Button>
        <Button
          onClick={() => onChange(generateTrellisData(data))}
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#014f86", width: 150 }}
        >
          Atualizar
        </Button>
        <Button
          onClick={() => {
            restartTrellis();
            onChange(generateTrellisData(dataInitial));
          }}
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#4cc9f0", width: 150 }}
        >
          Reiniciar
        </Button>
      </S.ButtonsContainer>
    </S.TableBlock>
  );
};

export default TreillisTable;
