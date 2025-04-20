const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();
const userRoutes = require("./routes/user.routes");
const CompanyRoutes = require("./routes/company.routes");
const JobRoutes = require('./routes/jobs.routes');
const ApplicationRoutes = require('./routes/application.routes');

 
const connectDB = require('./utils/db');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));


app.use("/api/v1/user" ,userRoutes);
app.use("/api/v1/company" ,CompanyRoutes);
app.use("/api/v1/job" ,JobRoutes);
app.use("/api/v1/application" ,ApplicationRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT ,()=>{
    connectDB();
    console.log(`Server is listening at port ${PORT}`)
})
