const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/web-quiz');
// mongoose.connect('mongodb://localhost:27017/web-quiz', { useNewUrlParser: true, useUnifiedTopology: true });

const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const dataFromMongodb = mongoose.model('datas',dataSchema);

// console.log("testing running");

const SaveInDb = async () => {
    const data = new dataFromMongodb({ name: "rohit", age: 22, email: "rohit@gmail.com"});
    const result = await data.save();
    console.log(result);

}
SaveInDb();

const findInDb = async () => {
    const data = await dataFromMongodb.find({ name: "rony" }); // find particular data by .........
    console.log(data);
}
findInDb();



// app.post('/', (req, res) => {
//     const { name, age, email } = req.body;
//     console.log(req.body);
//     const newData = new dataFromMongodb({ name, age, email });
//     newData.save((err) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(200).send('dataFromMongodb saved successfully');
//       }
//     });
//   });
  
//   app.get('/api/getData', (req, res) => {
//     dataFromMongodb.find({}, (err, data) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(200).send(data);
//       }
//     });
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });