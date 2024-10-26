const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: [process.env.FRONTENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE']}
));
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});