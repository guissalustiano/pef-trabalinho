import styled from "styled-components";

export const TableStyle = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    input {
      font-size: 12px;
      padding: 0;
      margin: 0;
      border: 0;
      width: 80px;
    }

    th,
    td {
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    th {
      background: #014f86;
      color: white;
      font-weight: bold;
    }
  }
`;
