const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = express.Router();

const port = 3000;
require('dotenv').config()

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const ordersRoutes = require('./routes/orders');
// Connect to MongoDB DvpfiExlBrv6I5Wk ..
mongoose.connect('mongodb+srv://mdmobashirraza:DvpfiExlBrv6I5Wk@cluster0.dn9dx7v.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected successfully');
});


//Configure routes
app.use('/api', authRoutes);
app.use('/api', booksRoutes);
app.use('/api', ordersRoutes);

router.get('/', function (req, res) {
  return res.status(200).json({ message: 'API is working' });
});

// Mount the router on the /api path prefix
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});