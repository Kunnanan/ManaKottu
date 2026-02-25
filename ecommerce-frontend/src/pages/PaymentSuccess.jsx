import { useParams, Link } from "react-router-dom"
import "./paymentSuccess.css"

export default function PaymentSuccess(){

 const {id} = useParams()

 return(
  <div className="success-page">

   <div className="success-card">

    <div className="check-wrap">
     <div className="checkmark"></div>
    </div>

    <h1>Payment Successful</h1>

    <p className="subtitle">
     Thank you for your purchase. Your order has been confirmed.
    </p>

    <div className="order-box">
     <span>Order ID</span>
     <b>{id}</b>
    </div>

    <div className="btns">

     <Link to={`/orders/${id}`}>
      <button className="primary">
       View Order
      </button>
     </Link>

     <Link to="/">
      <button className="secondary">
       Continue Shopping
      </button>
     </Link>

    </div>

   </div>

  </div>
 )
}