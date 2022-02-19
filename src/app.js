const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const cors = require('cors');
app.use(cors());
const config = require('./config');
const router = require('./routes');
const dummuyModel = require('../src/model/dummyData');

mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected!');
}).catch(err => console.error(err));

app.use(express.json());
app.use(router);

app.get("/", async (req,res)=>{
    res.send("Hello Amrut Halnor");
});

const createDummyData = (() => {
    dummuyModel.count({}, (error, numOfDocs) => {
        console.log('numOfDocs:', numOfDocs);
        if (numOfDocs == 0) {
            for (let index = 0; index < 100; index++) {
                const dummy = new dummuyModel({
                    firstname: faker.name.firstName(),
                    lastname: faker.name.lastName(),
                    phonenumber: faker.phone.phoneNumber(),
                    city: faker.address.city(),
                });
                dummy.save((err, data) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    });
})();

const port = process.env.PORT || 8000;  
app.listen( port, () => {
    console.log(`Connection is live at port no. ${port}`);
}); 