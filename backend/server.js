const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

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
  email: String,
  image: String // Added a field for image filename
});

const Data = mongoose.model('Data', dataSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/saveData', upload.single('image'), async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const newImage = req.file ? req.file.filename : null;

    const newData = new Data({ name, age, email, image: newImage });

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
