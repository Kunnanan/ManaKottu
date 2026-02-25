import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from "../api/api"
import "./home.css"

export default function Home(){
useEffect(()=>{
 document.title = "Home | ManaKottu"
},[])
 const [products,setProducts]=useState([])
 const [loading,setLoading]=useState(true)

 useEffect(()=>{
  API.get("/products")
   .then(res=>{
    setProducts(res.data)
    setLoading(false)
   })
   .catch(err=>{
    console.log(err)
    setLoading(false)
   })
 },[])


 return(
  <div className="home">

   {/* HERO */}
   <section className="hero">
    <div className="hero-text">
     <h1>Welcome to ManaKottu</h1>
     <p>Premium fashion curated for you.</p>

     <Link to="/products" className="hero-btn">
      Shop Now
     </Link>

    </div>
   </section>


   {/* CATEGORIES */}
   <section className="section">
    <h2>Shop By Category</h2>

    <div className="categories">
     <div className="cat-card">Electronics</div>
     <div className="cat-card">Fashion</div>
     <div className="cat-card">Shoes</div>
     <div className="cat-card">Accessories</div>
    </div>
   </section>



   {/* PRODUCTS */}
   <section className="section">
    <h2>Featured Products</h2>

    {loading ? (
     <div className="products">
      {[1,2,3,4,5,6].map(i=>(
       <div key={i} className="skeleton-card"/>
      ))}
     </div>
    ) : (
     <div className="products">
      {products.slice(0,6).map(p=>(
       <div className="product-card" key={p._id}>

        <img src={p.image || "https://via.placeholder.com/200"} />

        <h3>{p.title}</h3>
        <p>₹{p.price}</p>

        <Link to={`/product/${p._id}`} className="view-btn">
         View Product
        </Link>

       </div>
      ))}
     </div>
    )}

   </section>



   {/* CTA */}
   <section className="cta">
    <h2>Start Shopping Today</h2>
    <p>Thousands of products waiting for you.</p>

    <Link to="/products">
     Browse All
    </Link>

   </section>



   {/* FOOTER */}
   <footer className="footer">
    <p>© {new Date().getFullYear()} ManaKottu. All rights reserved.</p>
   </footer>

  </div>
 )
}