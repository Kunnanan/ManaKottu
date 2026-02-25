import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import {BrowserRouter} from "react-router-dom"
import { Toaster}from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>
  <App/>
  <Toaster
 position="top-center"
 toastOptions={{
  style:{
   background:"#111",
   color:"#fff",
   padding:"14px 20px",
   borderRadius:"12px"
  }
 }}
/>
 </BrowserRouter>
)