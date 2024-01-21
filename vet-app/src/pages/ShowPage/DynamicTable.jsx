import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./DynamicTable.css";
import ConfirmationPopup from "../../components/ConifrmationPopup/ConfirmationPopup";

const DynamicTable = ({ columns, data, onDelete, onEdit, title }) => {
  const [searched, setSearched] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [warning, setWarning] = useState(false);
  const [idToDelete, setId] = useState(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);

    const filtered = data.filter((row) => {
      return columns.some((column) =>
        String(row[column.key])
          .toLowerCase()
          .includes(searchedVal.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  const sortTable = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = String(a[key]);
      const bValue = String(b[key]);

      if (direction === "ascending") {
        return aValue.localeCompare(bValue, "pl", {
          numeric: true,
          sensitivity: "base",
        });
      } else {
        return bValue.localeCompare(aValue, "pl", {
          numeric: true,
          sensitivity: "base",
        });
      }
    });

    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  const deleteConfirmation = (id) => {
    setWarning(true);
    setId(id);
  };

  const cancelDelete = () => {
    setWarning(false);
    setId(null);
  };

  const confirmDelete = () => {
    onDelete(idToDelete);
    setWarning(false);
  };

  return (
    <div className="dynamic-table">
      <Sidebar />
      <h2 className="text-3xl font-semibold mt-5 mb-5 text-emerald-600">
        {title}
      </h2>
      <div className="searchbarTable">
        <input
          type="text"
          className="inputSearchTable"
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          placeholder="Wyszukaj..."
        />
      </div>
      <Paper>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    onClick={() => sortTable(column.key)}
                    sx={{ fontFamily: "Outfit", textAlign: "center" }}
                  >
                    {column.label}
                    {sortConfig.key === column.key && (
                      <span>
                        {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                  </TableCell>
                ))}
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <TableCell
                      key={columnIndex}
                      sx={{
                        fontFamily: "Outfit",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {column.key.includes(".")
                        ? row[column.key.split(".")[0]][
                            column.key.split(".")[1]
                          ]
                        : row[column.key]}
                    </TableCell>
                  ))}

                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none", fontFamily: "Outfit" }}
                      onClick={() => onEdit(row)}
                      style={{
                        backgroundColor: "#047857",
                      }}
                    >
                      Edytuj
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ textTransform: "none", fontFamily: "Outfit" }}
                      onClick={() => deleteConfirmation(row.id)}
                    >
                      Usuń
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {warning && (
        <ConfirmationPopup
          message="Czy na pewno chcesz usunąć rekord?"
          onConfirm={() => confirmDelete()}
          onCancel={cancelDelete}
          onYes="Tak"
          onNo="Nie"
        />
      )}
    </div>
  );
};

export default DynamicTable;
