const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/jobs';

mongoose.connect(mongoUrl)
.then(()=>{console.log(`Connected to ${mongoUrl} successfully`)})
.catch(()=>{console.log(`Connecting to ${mongoUrl} failed`)})

app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{

    console.log(`Server is up on Port: ${PORT}`);
})