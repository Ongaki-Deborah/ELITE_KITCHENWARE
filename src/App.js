import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import GetProducts from './components/GetProducts';
import NavBar from './components/NavBar';
import AddProducts from './components/AddProducts';
import MpesaPayment from './components/MpesaPayment';
import Wishlist from './components/WishList';
import Cart from './components/Cart'
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
         <h1 className='bg-danger text-dark text-center p-5 head'>ELITE_KITCHENWARE</h1>
        </header>
        <NavBar />
        <Routes>
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/" element={<GetProducts />} />
          <Route path="/mpesapayment" element={<MpesaPayment />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="/wishlist" element={<Wishlist />} />
           <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      </BrowserRouter>
      );
}

export default App;
