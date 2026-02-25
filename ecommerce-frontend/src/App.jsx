import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import OrderDetails from "./pages/OrderDetails"
import AdminRoute from "./components/AdminRoute"
import AdminOrders from "./pages/AdminOrders"
import AdminDashboard from "./pages/AdminDashboard"
import AdminUsers from "./pages/AdminUsers"
import PaymentSuccess from "./pages/PaymentSuccess"
import Navbar from "./components/Navbar"
import ProductDetails from "./pages/ProductDetails"

export default function App(){
 return(<>
    <Navbar/>
    <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/products" element={<Products/>}/>
   <Route path="/cart" element={<Cart/>}/>
   <Route path="/orders" element={<Orders/>}/>
   <Route path="/orders/:id" element={<OrderDetails/>}/>
   <Route path="/product/:id" element={<ProductDetails/>}/>
   <Route path="/payment-success/:id" element={<PaymentSuccess/>}/>
   <Route
 path="/admin"
 element={
  <AdminRoute>
   <AdminDashboard/>
  </AdminRoute>
 }
/>
   <Route
 path="/admin/orders"
 element={
  <AdminRoute>
   <AdminOrders/>
  </AdminRoute>
 }
/>
<Route
 path="/admin/users"
 element={
  <AdminRoute>
   <AdminUsers/>
  </AdminRoute>
 }
/>
  </Routes>

  </>
 )
}