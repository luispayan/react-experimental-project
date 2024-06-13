import Header from '../components/Header';
import ProductList from '../components/ProductList';
import '../styles/Products.css';

function Products() {
  const token = localStorage.getItem('token');
  if (!token) {
      window.location.href = '/login';
  }

  return (
    <>
      <Header/>
      <ProductList/>
    </>
  )
}

export default Products
