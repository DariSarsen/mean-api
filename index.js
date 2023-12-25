const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session');
const path = require('path')
const config = require('./config/db')
const db = mongoose.connection;
const bookRoutes = require('./routes/book');
const routAccount = require('./routes/account');
const uploadRouter = require('./routes/upload');


const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use(session({
  secret: config.secret, // Replace with a secret key for session encryption
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);



app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connection to MongoDB was completed successfully');
});

app.use(cors({
  origin:[
      'http://localhost:4200',
      'https://www.googleapis.com/books/v1/volumes'
  ]
}));

app.use('/books', bookRoutes);
app.use('/upload', uploadRouter);
app.use('/account', routAccount);

app.listen(port, ()=>{
    console.log("Server is running at port: " + port);
});