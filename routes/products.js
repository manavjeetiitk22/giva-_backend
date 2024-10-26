const express = require('express');
const pool = require('../db/connection');
const router = express.Router();
// Get all products
router.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add a new product
router.post('/products', async (req, res) => {
    const { name, description, price, quantity } = req.body;
    try {
        const result = await pool.query(
        'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, quantity]
    ); 
    res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Edit an existing product
router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    try {
        const result = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id= $5 RETURNING *',
        [name, description, price, quantity, id]
    );
        res.json(result.rows[0]);
    } catch (error) {
    res.status(500).json({ error: error.message });
    } 
});
// Delete a product
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM products WHERE id = $1', [id]);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;