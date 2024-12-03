const express = require('express');
const app = express();

app.use((req,res,next)=>{
    console.log('In the middleware');
    next(); // Allows the request to continue to the next middleware in line
});

app.use((req,res)=>{
    console.log('In another middleware');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

