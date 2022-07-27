import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { HomeScreen } from './screens/HomeScreen'
import { ProductScreen } from './screens/ProductScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartScreen from './screens/CartScreen'
import { SigninScreen } from './screens/SigninScreen'
import { Nav } from './components/Nav'

function App() {

  return (
    <BrowserRouter>
      {/* <div className='container-fluid m-0 p-0'> */}
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact></Route>
          <Route path='/product/:id' element={<ProductScreen />}></Route>
          <Route path='/signin' element={<SigninScreen />}></Route>
          <Route path='/cart/:id' element={<CartScreen />}></Route>

        </Routes>
      </main>

      <footer className='bg-dark mt-auto text-white text-center fixed-bottom p-1'>All right reserved</footer>
      {/* </div> */}
    </BrowserRouter>
  )
}
export default App