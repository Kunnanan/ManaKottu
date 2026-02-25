export default function Stars({value=0}){

 const stars=[]

 for(let i=1;i<=5;i++){
  if(value >= i)
   stars.push("★")
  else if(value >= i-0.5)
   stars.push("⯨")
  else
   stars.push("☆")
 }

 return <span style={{color:"gold",fontSize:20}}>
  {stars}
 </span>
}