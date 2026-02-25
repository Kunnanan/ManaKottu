export const sellerOnly = (req,res,next)=>{
 if(!req.user) 
  return res.status(401).json("Login required")

 if(!req.user.seller)
  return res.status(403).json("Seller account required")

 next()
}