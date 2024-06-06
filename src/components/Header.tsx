import Logo from '../assets/logo.png'
import { Typography } from '@mui/material';
function Header() {

  return (
    <div className='header relative object-top w-full justify-center justify-items-center'>
      <img className='size-24 mx-16' 
        src={Logo} alt="Logo" />

      <Typography className='font-bold text-white !text-2xl absolute inset-0 m-auto flex justify-center items-center'>
        Inventory Control
      </Typography>
    </div>
  );
}
export default Header;