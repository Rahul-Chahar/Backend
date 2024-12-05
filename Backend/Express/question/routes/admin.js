const express = require('express');
const router = express.Router();

// Route to display the form
router.get('/add-product', (req, res, next) => {
  res.send(`
    <form action="/add-product" method="POST">
      <label for="product-name">Product Name:</label>
      <input type="text" id="product-name" name="productName" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle form submission
router.post('/product', (req, res, next) => {
    console.log(req.body);
});

module.exports = router;