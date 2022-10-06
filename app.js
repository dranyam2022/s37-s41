const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"))


main().catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Connected to localhost:${port}`)
})