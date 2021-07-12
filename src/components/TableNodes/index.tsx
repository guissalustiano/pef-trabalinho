import React from "react";
import { useTable } from "react-table";
import EditableCell from "../EditableCell";
import { TableStyle } from "./styles";

interface TableNodesProps {
  columns: any;
  data: any;
  updateMyData(rowIndex: any, columnId: any, value: any): void;
}

const defaultColumn = {
  Cell: EditableCell,
};

const TableNodes: React.FC<TableNodesProps> = ({
  columns,
  data,
  updateMyData,
}) => {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData,
  });

  return (
    <TableStyle>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableStyle>
  );
};

export default TableNodes;
