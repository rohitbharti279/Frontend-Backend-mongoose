const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/web-quiz');



const dataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const Data = mongoose.model('Data', dataSchema);


// const SaveInDb = async () => {
//     const data = new Data({ name: "test1", age: 11, email: "test1@gmail.com"});
//     const result = await data.save();
//     console.log(result);

// }
// SaveInDb();

// const findInDb = async () => {
//     const data = await Data.find({ name: "rony" }); // find particular data by .........
//     console.log(data);
// }
// findInDb();




app.post('/api/saveData', async (req, res) => {
    try {
      const { name, age, email } = req.body;
      const newData = new Data({ name, age, email });
      await newData.save();
      res.status(200).send('Data saved successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

app.get('/api/getData', (req, res) => {
    Data.find({})
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send(err));
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



