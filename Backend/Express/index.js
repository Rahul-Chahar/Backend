const express = require('express');
const app = express();

// Body-parser middleware
app.use(express.urlencoded({ extended: true })); // Parses form data

// Route to display the form
app.get('/add-product', (req, res) => {
  res.send(`
    <form action="/add-product" method="POST">
      <label for="product-name">Product Name:</label>
      <input type="text" id="product-name" name="productName" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle form submission
app.post('/add-product', (req, res) => {
  const productName = req.body.productName; // Access parsed form data
  console.log('Product Name:', productName); // Log data to the console

  res.send('Product added successfully!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});