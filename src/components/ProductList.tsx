import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import Table from './table/Table';
import TableHead from './table/TableHead';
import TableBody from './table/TableBody';
import TableRow from './table/TableRow';
import TableCell from './table/TableCell';
import ProductForm from './ProductForm';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const App = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const headers = ['ID', 'Name', 'Inventory', 'Actions'];

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      setError(true);
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = (id: any) => {
    withReactContent(Swal).fire({
      title: 'Do you want to delete this product?',
      text: 'This action cannot be undone',
      icon: 'error',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          setProducts(products.filter(product => product.id !== id));
          withReactContent(Swal).fire({
            title: 'Product deleted',
            icon: 'success'
          });
        } catch (error) {
          withReactContent(Swal).fire({
            title: 'Error',
            text: 'An error occurred while trying to delete the product',
            icon: 'error'
          });
          console.error('Error trying to delete product:', result);
        }
      }
    });
  }

  return (
    <>
      <h1 className='!font-bold !text-2xl pt-4 text-center'>
        Products List
      </h1>
      <ProductForm className='bg-green-500 hover:bg-green-700 text-white px-4 py-2 float-right mr-16 mb-4' action="create" onAction={fetchProducts}/>
      <Table aria-label="simple table" className="px-16">
        <TableHead className='bg-red-300'>
          <TableRow>
              {headers.map((header) => (
                  <TableCell key={header} className='!font-bold !text-lg'>{header}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody className='bg-red-100'>
          {products.map((product, index) => (
              <TableRow className={index % 2 === 0 ? 'bg-red-200' : 'bg-red-100'}
                key={product.id}
              >
                  <TableCell>
                      {product.id}
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.inventory}</TableCell>
                  <TableCell align="left">
                      <ProductForm className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mx-2' action="update" data={product} onAction={fetchProducts}/>
                      <button onClick={() => removeProduct(product.id)}
                        className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg'>
                          Delete
                      </button>
                  </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default App;