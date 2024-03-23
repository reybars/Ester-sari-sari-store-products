import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import 'dotenv/config';



const app = express();
const port = 3000;
let product = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


const client = new pg.Client({
  host: process.env.PGHOST, 
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
});
client.connect();

const result = await client.query("select * from product_list");
console.log(result.rows);

app.get("/", async(req, res) => {
  const result = await client.query("SELECT * FROM product_list");
  res.render('index.ejs', {products: result.rows, total : result.rows.length});
})



app.get("/login", (req, res) => {
  res.render("login.ejs");
})
// go to add product page
app.get("/addProduct", (req, res) => {
  res.render("add_product.ejs");
})

app.get('/about', (req, res)=>{
  res.render('about.ejs');

})


// add product to the database
app.post("/addProductData", async(req, res)=>{
  const price = Number(req.body.price);
  const product_name = req.body.product_name;
  const product_image_url = req.body.product_image_url;
  await client.query("INSERT INTO product_list (product_name, price, product_image_url) VALUES ($1, $2, $3)", [product_name, price, product_image_url]);
  res.redirect('/');
})

app.post('/editProduct', async (req, res) => {
  res.render('edit_product.ejs', {product: req.body});;
})

app.post('/updateProduct', async (req, res) => {
  const id = Number(req.body.id);
  const product_name = req.body.product_name;
  const price = Number(req.body.price);
  const product_image_url = req.body.product_image_url;
  await client.query("UPDATE product_list SET product_name = $1, price = $2, product_image_url = $3 WHERE id = $4", [product_name, price, product_image_url, id]);
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
