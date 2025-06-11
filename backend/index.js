import express from "express";
import mysql2 from "mysql2/promise";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import bcrypt from 'bcrypt'
const port = 4600
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended:true,
}));

app.use(express.static("upload"))



// connecting with database//


  const con = await mysql2.createConnection({
  host: 'localhost',
  user: 'ecommerce',
  password: '12345678',
  database: 'ecommerce'
});

// Connect to the database
con.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!')})

  


//Api creation//
app.listen(port,()=>{
    console.log("server is running")
})


const storage = multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_ ${Date.now()}${path.extname(file.originalname)}`)
       
    }
})

const upload = multer({storage:storage})
// creating api for uploading images//

app.post("/upload", upload.single("product"), (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "No file uploaded"
      });
    }

    // Validate file type (example: allow only images)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        msg: "Only JPG, PNG, or GIF files are allowed"
      });
    }

    // Validate file size (example: max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        msg: "File size exceeds 5MB limit"
      });
    }

    // Construct secure URL//
    const imageUrl = `${process.env.BASE_URL || `http://localhost:${port}`}/images/${req.file.filename}`;

    res.json({
      success: true,
      image_url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      msg: "Error processing file upload",
      error: error.message
    });
  }
});

// creating api for product table creation//
// New promise style
app.get("/create-table", async (req, res) => {
  try {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS products(
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        new_price DECIMAL(10,2) NOT NULL,
        old_price DECIMAL(10,2) NOT NULL
      )`;
    
    await con.query(createTableSQL);
    res.json({ success: true, msg: "Table created successfully" });
  } catch (error) {
    console.error("Table creation error:", error);
    res.status(500).json({ success: false, msg: "Error creating table" });
  }
});
app.get("/create-user-table", async (req, res) => {
  try {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;
    
    await con.query(createTableSQL);
    res.json({ 
      success: true, 
      msg: "User table created successfully!" 
    });
  } catch (error) {
    console.error("User table creation error:", error);
    res.status(500).json({ 
      success: false, 
      msg: "Error creating user table",
      error: error.message 
    });
  }
});

// Utility function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "auth-token", {
    expiresIn: '30d',
  });
};

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please provide name, email, and password' });
    }

    // Check if user already exists
    const [users] = await con.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.status(400).json({ msg: 'User already exists with this email' });
    }
    
        if(password.length<6){
            res.json({msg:"password must be alleast 6 characters"})
        }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await con.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Generate token
    const token = generateToken(result.insertId);

    res.status(201).json({
        success:true,
      id: result.insertId,
      name,
      email,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ msg: 'Server error during signup' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({success:false, msg: 'Please provide email and password' });
    }

    // Check if user exists
    const [users] = await con.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({success:false, msg: 'Invalid Email' });
    }

    const user = users[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({success:false, msg: 'Invalid Password' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
    success:true,
      id: user.id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({success:fals, msg: 'Server error during login' });
  }
});

// Protected route example
// app.get('/api/profile', async (req, res) => {
//   try {
//     // Get token from header
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, "auth-token");

//     // Get user from database
//     const [users] = await con.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [decoded.id]);
    
//     if (users.length === 0) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     res.json(users[0]);
//   } catch (error) {
//     console.error('Profile error:', error);
//     res.status(500).json({ msg: 'Server error while fetching profile' });
//   }
// });

 
app.post("/addproduct", async (req,res)=>{
const{name,image,category,new_price,old_price} = req.body;

const sql = `INSERT INTO products (name, image, category, new_price, old_price) VALUES (?, ?, ?, ?, ?)  `
con.query(sql,[name,image,category,new_price,old_price], (err)=>{
    if(err) console.log(err)
})
res.json({ success:true, msg:"product added succesfully!"})
})



// creating api for deleting product from db//

app.delete("/remove", async (req, res) => {
  try {
    const { id } = req.body;

    // Validate ID is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid product ID"
      });
    }

    // Secure parameterized query
    const [result] = await con.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    // Check if any row was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        msg: "Product not found or already deleted"
      });
    }

    res.json({
      success: true,
      msg: "Product deleted successfully"
    });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      msg: "Error deleting product",
      error: error.message
    });
  }
});

// creating api for getting all product//

app.get("/allproduct", async (req, res) => {
  try {
    const [products] = await con.query("SELECT * FROM products");
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, msg: "Error fetching products" });
  }
});


//creating api for new collections//

app.get('/newcollections', async (req,res)=>{
try {
    const [products] = await con.query("SELECT * FROM products");
    let newCollections = products.slice(1).slice(-8)
    res.json({ success: true, newCollections});
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, msg: "Error fetching products" });
  }
});

// creating api for popular in womens section//

app.get('/popularinwomen',async(req,res)=>{
    try {
    const [products] = await con.query("SELECT * FROM products where products.category = 'women'");
    let popularinwoen = products.slice(1,4)
    res.json({ success: true, popularinwoen});
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, msg: "Error fetching products" });
  }
});





 app.get("/",(req,res)=>{
    res.send("hello!")
 })