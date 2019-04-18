// Does not support import by default yet.
const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

// Middleware to handle CORS errors???
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Initilize middleware
// Body parser??
app.use(express.json());
// Handle form submissons??
app.use(express.urlencoded({extended: false}));
app.use(logger);
// // Shorthand...
// app.use((req, res, next) => {
//   console.log('Hello I am logger');
//   next();
// })

// // Create a route
// // This is not a  good idea because you have to put every single route manually.
// app.get('/', (req, res) => {
//   // Can send file, JSON.
//   // res.send('<h1>Hello World!!</h1>');
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>');
// });

// Set a static folder.
// Do not have to add route manually, just use /FILENAME
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes.
app.use('/api/members', require('./routes/api/members'));

// Check environment variable first.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
