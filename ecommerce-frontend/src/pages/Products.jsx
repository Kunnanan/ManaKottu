import { useEffect,useState } from "react"
import API from "../api/api"
import "./products.css"
import { Link } from "react-router-dom"

export default function Products(){
useEffect(()=>{
 document.title = "Products | ManaKottu"
},[])
 const [products,setProducts]=useState([])
 const [loading,setLoading]=useState(true)

 useEffect(()=>{
  API.get("/products")
   .then(res=>{
    setProducts(res.data)
    setLoading(false)
   })
 },[])

 return(
  <div className="products-page">

   <h1 className="title">Explore Products</h1>

   {loading && <p className="loading">Loading products...</p>}

   <div className="grid">

    {products.map(p=>(
 <Link to={`/product/${p._id}`} key={p._id} className="link">

  <div className="card">

   <div className="img-wrap">
    <img src={p.image}/>
   </div>

   <h3>{p.title}</h3>

   <p className="price">₹{p.price}</p>

   <button className="btn">
    View Details
   </button>

  </div>

 </Link>
))}


   </div>
  </div>
 )
}