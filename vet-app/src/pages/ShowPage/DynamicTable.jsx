import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';

const DynamicTable = ({ columns, data, onDelete, onEdit, title }) => {
  const [searched, setSearched] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);

    // Implement search logic here
    const filtered = data.filter((row) => {
      return columns.some((column) =>
        String(row[column.key]).toLowerCase().includes(searchedVal.toLowerCase())
      );
    });

    setFilteredData(filtered);
  };

  const sortTable = (key) => {
    let direction = 'ascending';
  
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
  
    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = String(a[key]);
      const bValue = String(b[key]);
  
      if (direction === 'ascending') {
        return aValue.localeCompare(bValue, 'pl', { numeric: true, sensitivity: 'base' });
      } else {
        return bValue.localeCompare(aValue, 'pl', { numeric: true, sensitivity: 'base' });
      }
    });
  
    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };
  
  return (
    <>
      <Sidebar />
      <h2 className="text-3xl font-semibold mt-5 mb-5 text-emerald-600">{title}</h2>
      <Paper>
        {/* Search bar */}
        <input
          type="text"
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
          placeholder="Search..."
        />

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} onClick={() => sortTable(column.key)}>
                    {column.label}
                    {sortConfig.key === column.key && (
                      <span>{sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'}</span>
                    )}
                  </TableCell>
                ))}
                <TableCell>Usuń</TableCell> {/* New column for delete button */}
                <TableCell>Edytuj</TableCell> {/* New column for delete button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>
                      {column.key.includes('.')
                        ? row[column.key.split('.')[0]][column.key.split('.')[1]]
                        : row[column.key]}
                    </TableCell>
                  ))}

                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default DynamicTable;
