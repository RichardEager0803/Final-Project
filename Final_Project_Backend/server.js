const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/images', express.static('public/images'));

const DB_FILE = './db.json';

// Helper functions
const readDB = () => {
    try {
        const data = fs.readFileSync(DB_FILE);
        return JSON.parse(data);
    } catch (err) {
        return { products: [], cart: [] };
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Get all products
app.get('/products', (req, res) => {
    const db = readDB();
    res.json(db.products);
});

// Get cart
app.get('/cart', (req, res) => {
    const db = readDB();
    res.json(db.cart);
});

// Add to cart
app.post('/cart', (req, res) => {
    const db = readDB();
    const item = req.body;

    const existing = db.cart.find(p => p.id === item.id);

    if (existing) {
        existing.quantity += item.quantity;
    } else {
        db.cart.push({
            ...item,
            cartId: Date.now()
        });
    }

    writeDB(db);
    res.json(db.cart);
});

// Update cart
app.put('/cart/:id', (req, res) => {
    const db = readDB();
    const id = parseInt(req.params.id);
    const { quantity } = req.body;

    const item = db.cart.find(i => i.cartId === id);
    if (item) {
        item.quantity = quantity;
    }

    writeDB(db);
    res.json(db.cart);
});

// Remove ONE item from cart
app.delete('/cart/:id', (req, res) => {
    const db = readDB();
    const id = parseInt(req.params.id);

    db.cart = db.cart.filter(item => item.cartId !== id);
    writeDB(db);

    res.json(db.cart);
});

// Clear cart
app.delete('/cart', (req, res) => {
    const db = readDB();

    db.cart = [];
    writeDB(db);

    res.json({ message: 'Cart cleared' });
});

app.listen(3001, () => console.log('Server running on port 3001'));