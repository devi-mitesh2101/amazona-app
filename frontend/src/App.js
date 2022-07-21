import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { HomeScreen } from './screens/HomeScreen'
import { ProductScreen } from './screens/ProductScreen'
import { Link, Route, Routes } from 'react-router-dom'
import CartScreen from './screens/CartScreen'
import { useSelector } from 'react-redux'
import { SigninScreen } from './screens/SigninScreen'

function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Amazona</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link text-white" aria-current="page" to="/cart">
                      Cart
                      {cartItems.length > 0 && (
                        <span className="badge bg-danger rounded-circle ms-1">{cartItems.length}</span>
                      )}
                    </Link>
                  </li>

                  {
                    userInfo ? (
                      <Link to='#'>{userInfo.name}</Link>
                    ) :
                      (
                        <li className="nav-item">
                          <Link className="nav-link text-white" to="/signin">Sign In</Link>
                        </li>
                      )
                  }

                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className='main'>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact></Route>
            <Route path='/product/:id' element={<ProductScreen />}></Route>
            <Route path='/signin' element={<SigninScreen />}></Route>
            <Route path='/cart/:id' element={<CartScreen />}></Route>

          </Routes>
        </div>
      </div>
    </>
  )
}
export default App