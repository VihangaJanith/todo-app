const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/dbConfig');




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/todo' , require('./routes/todoRoutes'));
app.use('/users' , require('./routes/userRoutes'));

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
    }
);


