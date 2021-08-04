const express = require('express');
const cors = require('cors');
//var bodyParser = require('body-parser');

//var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

//connect method to db
const db = require('./models/init.models');
console.log("connecting to db")
 db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('connected to database');
    }).catch(err => {
        console.log('problem connecting to db', err); process.exit;
    });


app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.use(express.bodyParser());

require('./routes/user.routes')(app);
  /**
 * @api {get} /
 * @apiGroup Sroot
 * @apiSuccess {API Working Welcome} 
 * @apiSuccess {}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      message: "API working Welcome."
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */ 
app.get("/", (req, res) => {
    res.status(200).json({ mesaage: "API working Welcome." });

})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT} at http://localhost:${PORT}`);
})