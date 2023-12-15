import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const DynamicTable = ({ columns, data, onDelete, onEdit }) => {
    return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>{column.label}</TableCell>
                ))}
                <TableCell>Usuń</TableCell> {/* New column for delete button */}
                <TableCell>Edytuj</TableCell> {/* New column for delete button */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>{row[column.key]}</TableCell>
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
      );
    };

export default DynamicTable;
