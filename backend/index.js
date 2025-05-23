require('dotenv').config();

const PORT = process.env.PORT || 5001;

// const app = require('./app');
const app = require('./app');
console.log('app:', app);
// console.log('typeof app.listen:', typeof app.listen);


app.listen(PORT,()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
    
});



