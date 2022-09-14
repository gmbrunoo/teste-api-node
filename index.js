
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");

const userRoutes = require('./src/user/routes')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
}));
 
app.use(cookieParser())

app.get("/",  (req, res) => { res.send('Hello World')})

app.use('/api/v1/users', userRoutes);

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    next()
});

app.listen(port, () => console.log(`App listening on port ${port}`));