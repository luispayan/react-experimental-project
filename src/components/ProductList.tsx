import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const App = () => {
  const [users, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const headers = ['ID', 'Name', 'Inventory', 'Actions'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        setError(true);
        console.error('Error fetching products:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
        <Typography className='!font-bold !text-2xl pt-4 text-center'>
            Products List
        </Typography>
        <button className='bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg float-right mr-16 mb-4'>Add</button>
        <TableContainer component={Paper} className='px-16 mt-4 !shadow-none'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className='bg-red-300'>
            <TableRow>
                {headers.map((header) => (
                    <TableCell key={header} className='!font-bold !text-lg'>{header}</TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody className='bg-red-100'>
            {users.map((row, index) => (
                <TableRow className={index % 2 === 0 ? 'bg-red-200' : 'bg-red-100'}
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.inventory}</TableCell>
                    <TableCell align="left">
                        <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mx-2'>Edit</button>
                        <button className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg'>Delete</button>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
};

export default App;