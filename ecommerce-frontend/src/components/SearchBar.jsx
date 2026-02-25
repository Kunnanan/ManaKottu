import { useState, useEffect } from "react"
import API from "../api/api"
import "./search.css"

export default function SearchBar(){

 const [query,setQuery]=useState("")
 const [results,setResults]=useState([])
 const [show,setShow]=useState(false)

 useEffect(()=>{

  if(!query){
   setResults([])
   return
  }

  const delay=setTimeout(()=>{
   API.get(`/products?search=${query}`)
    .then(res=>{
     setResults(res.data)
     setShow(true)
    })
  },400)

  return ()=>clearTimeout(delay)

 },[query])


 return(
  <div className="search">

   <input
    placeholder="Search products..."
    value={query}
    onChange={e=>setQuery(e.target.value)}
    onFocus={()=>setShow(true)}
    onBlur={()=>setTimeout(()=>setShow(false),200)}
   />

   {show && results.length>0 && (
    <div className="results">

     {results.map(p=>(
      <a
       key={p._id}
       href={`/product/${p._id}`}
       className="result-item"
      >
       <img src={p.image || "https://via.placeholder.com/40"} />
       <span>{p.title}</span>
      </a>
     ))}

    </div>
   )}

  </div>
 )
}