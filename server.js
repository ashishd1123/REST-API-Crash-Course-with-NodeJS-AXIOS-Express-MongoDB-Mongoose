const express = require('express');

const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = require('./app/models');

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the Database");
}).catch(() => {
    console.log('Cannot connect to the Database');
    process.exit();
});

app.get("/", (req, res) => {
    res.json({message: "Welcome to Mad Tech Application"});
});

require('./app/routes/employees.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});