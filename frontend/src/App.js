import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { HomeScreen } from './screens/HomeScreen'
import { ProductScreen } from './screens/ProductScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartScreen from './screens/CartScreen'
import { SigninScreen } from './screens/SigninScreen'
import { Nav } from './components/Nav'
import { RegisterScreen } from './screens/RegisterScreen'
import { ShippingAddressScreen } from './screens/ShippingAddressScreen'
import { PaymentMethodScreen } from './screens/PaymentMethodScreen'
import { PlaceOrderScreen } from './screens/PlaceOrderScreen'
import { OrderScreen } from './screens/OrderScreen'
import { OrderHistoryScreen } from './screens/OrderHistoryScreen'
import { ProfileScreen } from './screens/ProfileScreen'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact></Route>
          <Route path='/product/:id' element={<ProductScreen />}></Route>
          <Route path='/signin' element={<SigninScreen />}></Route>
          <Route path='/register' element={<RegisterScreen />}></Route>
          <Route path='/cart/:id' element={<CartScreen />}></Route>
          <Route path='/cart' element={<CartScreen />}></Route>
          <Route path='/shipping' element={<ShippingAddressScreen />}></Route>
          <Route path='/payment' element={<PaymentMethodScreen />}></Route>
          <Route path='/placeorder' element={<PlaceOrderScreen />}></Route>
          <Route path='/order/:id' element={<OrderScreen />}></Route>
          <Route path='/orderhistory' element={<OrderHistoryScreen />}></Route>
          <Route path='/profile' element={<ProfileScreen />}></Route>
        </Routes>
      </main>
      <footer className="row d-flex justify-content-center fixed-bottom p-2">
        All right reserved @2022
      </footer>
    </BrowserRouter >
  )
}
export default App