import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import API from "../api/api"
import "./product.css"
import Stars from "../components/Stars"
import toast from "react-hot-toast"

export default function ProductDetails(){
const {id}=useParams()

const [product,setProduct]=useState(null)
const [img,setImg]=useState(0)
const [qty,setQty]=useState(1)

useEffect(()=>{
 document.title = product
  ? product.title + " | ManaKottu"
  : "Loading..."
},[product])
 

 const [reviews,setReviews]=useState([])
 const [rating,setRating]=useState(5)
 const [comment,setComment]=useState("")
 const [loadingReviews,setLoadingReviews]=useState(true)



 /* LOAD PRODUCT + REVIEWS */
 useEffect(()=>{

  API.get(`/products/${id}`)
   .then(res=>setProduct(res.data))

  API.get(`/reviews/${id}`)
   .then(res=>{
    setReviews(res.data)
    setLoadingReviews(false)
   })

 },[id])



 /* ADD TO CART */
 const addToCart = async()=>{

 try{

  const imgEl=document.querySelector(".main")
  const clone=imgEl.cloneNode(true)

  const rect=imgEl.getBoundingClientRect()

  clone.style.position="fixed"
  clone.style.left=rect.left+"px"
  clone.style.top=rect.top+"px"
  clone.style.width=rect.width+"px"
  clone.style.zIndex=1000
  clone.style.transition="all .8s ease"

  document.body.appendChild(clone)

  setTimeout(()=>{
   clone.style.left="90%"
   clone.style.top="10px"
   clone.style.width="50px"
   clone.style.opacity="0"
  },10)

  setTimeout(()=>clone.remove(),800)

  await API.post("/cart",{
   productId:id,
   qty
  })

  toast.success("Added to cart 🛒")

 }catch(err){
  toast.error(err.response?.data || "Login required")
 }

 }



 /* SUBMIT REVIEW */
 const submitReview = async()=>{

  try{

   if(!comment.trim())
    return toast.error("Write comment first")

   await API.post("/reviews",{
    productId:id,
    rating,
    comment
   })

   toast.success("Review Added 🎉")

   const res = await API.get(`/reviews/${id}`)
   setReviews(res.data)

   setComment("")
   setRating(5)

  }catch(err){
   toast.error(err.response?.data || "Review failed")
  }

 }



 if(!product) return <h2 style={{padding:40}}>Loading...</h2>



 const images = product.images?.length
  ? product.images
  : [product.image]



 return(
 <div className="detail">

  {/* LEFT — IMAGE */}
  <div className="gallery">

   <div className="zoom-container">
    <img
     src={images[img]}
     className="main"
     onMouseMove={e=>{
      const rect=e.target.getBoundingClientRect()
      const x=((e.clientX-rect.left)/rect.width)*100
      const y=((e.clientY-rect.top)/rect.height)*100
      e.target.style.transformOrigin=`${x}% ${y}%`
     }}
     onMouseEnter={e=>e.target.style.transform="scale(2)"}
     onMouseLeave={e=>e.target.style.transform="scale(1)"}
    />
   </div>

   <div className="thumbs">
    {images.map((src,i)=>(
     <img
      key={i}
      src={src}
      className={i===img?"active":""}
      onClick={()=>setImg(i)}
     />
    ))}
   </div>

  </div>



  {/* RIGHT — INFO */}
  <div className="info">

   <h2>{product.title}</h2>

   <p className="price">₹{product.price}</p>

   <p className="desc">{product.description}</p>

   <div style={{
    display:'inline-block',
    transform:'scale(2)',
    transformOrigin:'left',
    marginBottom:15
   }}>
    <Stars value={product.rating}/>
   </div>


   {/* QTY */}
   <div className="qty-box">

    <button onClick={()=>qty>1 && setQty(qty-1)}>−</button>
    <span>{qty}</span>
    <button onClick={()=>setQty(qty+1)}>+</button>

   </div>


   {/* ADD CART */}
   <button className="buy" onClick={addToCart}>
    Add To Cart
   </button>



   {/* WRITE REVIEW */}
   <div className="review-form">

    <h3>Write Review</h3>

    {[1,2,3,4,5].map(star=>(
     <span
      key={star}
      onClick={()=>setRating(star)}
      style={{
       cursor:"pointer",
       fontSize:25,
       color: star<=rating ? "gold":"gray"
      }}
     >
      ★
     </span>
    ))}

    <textarea
     placeholder="Write your review..."
     value={comment}
     onChange={e=>setComment(e.target.value)}
    />

    <button className="review-btn" onClick={submitReview}>
     Submit Review
    </button>

   </div>



   {/* REVIEWS */}
   <div style={{marginTop:40}}>

    <h3>Customer Reviews</h3>

    {loadingReviews && <p>Loading reviews...</p>}

    {!loadingReviews && reviews.length===0 && (
     <p>No reviews yet</p>
    )}

    {reviews.map(r=>(
     <div key={r._id} className="review-card">
      <b>{r.user.name}</b>
      <p>{"⭐".repeat(r.rating)}</p>
      <p>{r.comment}</p>
     </div>
    ))}

   </div>

  </div>

 </div>
 )
}