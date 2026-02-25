import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "./models/Product.js"

dotenv.config()

await mongoose.connect(process.env.MONGO_URL)

const products = [
{"title":"Nike Air Max Shoes","description":"Running sneakers","price":7999,"stock":40,"image":"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTRTxnV5P9VJg9f-pCPiEiJ2Mhwp0vnLtuMckZJEEOuzu5-0U99nV1hMYrA8XIK5ukFuKpvh8jpkc2xh6ZEsWwCftci90WU_616IInW5hl6oGs1I0rSGUEnkQ"},
{"title":"Adidas Hoodie","description":"Cotton hoodie","price":3999,"stock":50,"image":"https://assets.adidas.com/images/w_600,f_auto,q_auto/hoodie.jpg"},
{"title":"Puma T-Shirt","description":"Sports t-shirt","price":1499,"stock":100,"image":"https://images.puma.com/image/upload/tshirt.jpg"},
{"title":"Levis Jeans","description":"Slim fit denim","price":3499,"stock":60,"image":"https://lsco.scene7.com/is/image/lsco/levis_jeans.jpg"},
{"title":"RayBan Sunglasses","description":"UV protected","price":5999,"stock":35,"image":"https://assets.ray-ban.com/is/image/RayBan/sunglasses.jpg"},

{"title":"Apple iPhone","description":"Latest smartphone","price":79999,"stock":25,"image":"https://store.storeimages.cdn-apple.com/iphone.jpg"},
{"title":"Samsung Galaxy","description":"Android phone","price":69999,"stock":30,"image":"https://images.samsung.com/galaxy.jpg"},
{"title":"Sony Headphones","description":"Noise cancelling","price":19999,"stock":45,"image":"https://sony.scene7.com/headphones.jpg"},
{"title":"HP Laptop","description":"14 inch laptop","price":55999,"stock":20,"image":"https://ssl-product-images.www8-hp.com/laptop.jpg"},
{"title":"Logitech Mouse","description":"Wireless mouse","price":1299,"stock":120,"image":"https://resource.logitech.com/mouse.jpg"},

{"title":"Boat Earbuds","description":"Bluetooth earbuds","price":2499,"stock":90,"image":"https://cdn.boat-lifestyle.com/earbuds.jpg"},
{"title":"JBL Speaker","description":"Portable speaker","price":3999,"stock":70,"image":"https://www.jbl.com/speaker.jpg"},
{"title":"Dell Monitor","description":"24 inch monitor","price":12999,"stock":35,"image":"https://i.dell.com/monitor.jpg"},
{"title":"SanDisk SSD","description":"1TB SSD","price":8999,"stock":55,"image":"https://www.westerndigital.com/ssd.jpg"},
{"title":"TPLink Router","description":"WiFi router","price":2499,"stock":80,"image":"https://static.tp-link.com/router.jpg"},

{"title":"Fossil Watch","description":"Analog watch","price":9999,"stock":40,"image":"https://fossil.scene7.com/watch.jpg"},
{"title":"Casio Watch","description":"Digital watch","price":2999,"stock":90,"image":"https://www.casio.com/watch.jpg"},
{"title":"Titan Watch","description":"Luxury watch","price":12999,"stock":25,"image":"https://www.titan.co.in/watch.jpg"},
{"title":"Wildcraft Backpack","description":"Travel bag","price":2999,"stock":60,"image":"https://assets.wildcraft.com/backpack.jpg"},
{"title":"Skybags Suitcase","description":"Hard luggage","price":5999,"stock":20,"image":"https://skybags.co.in/suitcase.jpg"},

{"title":"IKEA Chair","description":"Office chair","price":4999,"stock":30,"image":"https://www.ikea.com/chair.jpg"},
{"title":"Godrej Sofa","description":"3 seater sofa","price":25999,"stock":15,"image":"https://www.godrejinterio.com/sofa.jpg"},
{"title":"Nilkamal Table","description":"Study table","price":3999,"stock":45,"image":"https://www.nilkamalfurniture.com/table.jpg"},
{"title":"Philips Lamp","description":"Desk lamp","price":1999,"stock":70,"image":"https://www.assets.signify.com/lamp.jpg"},
{"title":"Prestige Cooker","description":"Pressure cooker","price":3499,"stock":65,"image":"https://www.prestige.com/cooker.jpg"},

{"title":"Milton Bottle","description":"Steel bottle","price":799,"stock":150,"image":"https://m.media-amazon.com/images/milton.jpg"},
{"title":"Cello Lunch Box","description":"Food container","price":599,"stock":120,"image":"https://cello.in/lunchbox.jpg"},
{"title":"Butterfly Pan","description":"Nonstick pan","price":1799,"stock":55,"image":"https://butterflyindia.com/pan.jpg"},
{"title":"Borosil Plate","description":"Dinner plates","price":1499,"stock":40,"image":"https://borosil.com/plates.jpg"},
{"title":"KitchenAid Knife","description":"Knife set","price":3999,"stock":30,"image":"https://www.kitchenaid.com/knife.jpg"},

{"title":"Classmate Notebook","description":"College notebook","price":120,"stock":400,"image":"https://www.itcstore.in/notebook.jpg"},
{"title":"Parker Pen","description":"Ball pen","price":299,"stock":350,"image":"https://www.parkerpen.com/pen.jpg"},
{"title":"Camlin Marker","description":"Whiteboard marker","price":80,"stock":250,"image":"https://www.kokuyocamlin.com/marker.jpg"},
{"title":"American Tourister Bag","description":"School bag","price":1999,"stock":100,"image":"https://www.americantourister.com/bag.jpg"},
{"title":"Casio Calculator","description":"Scientific calculator","price":999,"stock":90,"image":"https://www.casio.com/calculator.jpg"},

{"title":"Cosco Football","description":"Sports football","price":899,"stock":120,"image":"https://cosco.in/football.jpg"},
{"title":"SS Cricket Bat","description":"Wood bat","price":2999,"stock":60,"image":"https://sscricket.com/bat.jpg"},
{"title":"Yonex Racket","description":"Badminton racket","price":3499,"stock":45,"image":"https://www.yonex.com/racket.jpg"},
{"title":"Boldfit Yoga Mat","description":"Exercise mat","price":999,"stock":130,"image":"https://boldfit.in/yogamat.jpg"},
{"title":"Kore Dumbbell","description":"Gym dumbbell","price":2499,"stock":40,"image":"https://korefitness.com/dumbbell.jpg"},

{"title":"Nivea Face Wash","description":"Skin cleanser","price":299,"stock":200,"image":"https://www.nivea.in/facewash.jpg"},
{"title":"Dove Soap","description":"Bath soap","price":99,"stock":500,"image":"https://www.dove.com/soap.jpg"},
{"title":"L'Oreal Shampoo","description":"Hair shampoo","price":499,"stock":180,"image":"https://www.loreal.com/shampoo.jpg"},
{"title":"Lakme Perfume","description":"Luxury perfume","price":1999,"stock":90,"image":"https://lakmeindia.com/perfume.jpg"},
{"title":"Mamaearth Cream","description":"Moisturizer","price":399,"stock":160,"image":"https://mamaearth.in/cream.jpg"},

{"title":"Hot Wheels Car","description":"Toy car","price":399,"stock":300,"image":"https://hotwheels.mattel.com/car.jpg"},
{"title":"Barbie Doll","description":"Kids doll","price":999,"stock":150,"image":"https://shop.mattel.com/barbie.jpg"},
{"title":"Ravensburger Puzzle","description":"Brain puzzle","price":1499,"stock":70,"image":"https://www.ravensburger.org/puzzle.jpg"},
{"title":"Monopoly Game","description":"Board game","price":1999,"stock":80,"image":"https://hasbro.com/monopoly.jpg"},
{"title":"LEGO Classic","description":"Building blocks","price":3499,"stock":60,"image":"https://www.lego.com/classic.jpg"}
]

await Product.deleteMany() // optional reset
await Product.insertMany(products)

console.log("Products inserted")
process.exit()