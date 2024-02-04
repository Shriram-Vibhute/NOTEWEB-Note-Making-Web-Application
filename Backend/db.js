const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/iNoteBook"; // localhost is not working in new node versions

async function connectToMongo() {
    await mongoose.connect(mongoURI);
}
connectToMongo().then((value) => {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err);
    console.log("ERROR");
});

module.exports = connectToMongo;