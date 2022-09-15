
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");

const userRoutes = require('./src/user/routes')
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use(express.json());

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://gmbrunoo.github.io'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials:true,  
}));
 
app.get("/",  (req, res) => { res.send('Hello World')})

app.use('/api/v1/users', userRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));