import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

export default function App() {
  const [searchBy, setSearchBy] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [books, setBooks] = React.useState([]);


  // Function to search books
  const searchBooks = async () => {

    // Replace with your actual search API endpoint
    const response = await fetch(
      `https://library-test-fpc8cbesdyatbmdu.brazilsouth-01.azurewebsites.net/search?SearchBy=${searchBy}&SearchValue=${searchValue}`
    );

    if (!response.ok) {
      throw new Error('Search failed');
    }
    const data = await response.json();

    let localBooks = [];

    for (let i = 0; i < data.length; i++) {

      var book = data[i];

      localBooks.push({
        id : book.bookId,
        title: book.title,
        publisher: book.publisher,
        authors: book.authors,
        type: book.type,
        isbn: book.isbn,
        category: book.category,
        avaiablecopies: book.avaiablecopies
      })
    }

    setBooks(localBooks);

  };

  const handleChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchValueChange = (ev) => {
    setSearchValue(ev.target.value);
  }

  const columns = [
    { id: 1, field: 'title', headerName: 'Book Title', width: 150 },
    { id: 2, field: 'publisher', headerName: 'Publisher', width: 130 },
    { id: 3, field: 'authors', headerName: 'Authors', width: 130 },
    { id: 4, field: 'type', headerName: 'Type', width: 130 },
    { id: 5, field: 'isbn', headerName: 'isbn', width: 130 },
    { id: 6, field: 'category', headerName: 'Category', width: 130 },
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Search By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchBy}
          label="Search By"
          onChange={handleChange}
        >
          <MenuItem value={'Title'}>Title</MenuItem>
          <MenuItem value={'ISBN'}>ISBN</MenuItem>
          <MenuItem value={'Author'}>Author</MenuItem>
          <MenuItem value={'Category'}>Category</MenuItem>
        </Select>
        <TextField id="outlined-basic" variant="outlined" onChange={handleSearchValueChange} />
        <Button variant="contained" onClick={searchBooks}>Search</Button>
        <TableContainer component={Paper}>

          <DataGrid
            rows={books}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />

          
        </TableContainer>
      </FormControl>
    </Box>
  );
}