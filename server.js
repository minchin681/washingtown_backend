const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
var cors = require('cors')
app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wednesday', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
})

const appointmentSchema = new mongoose.Schema({
  name: String,
  day: String,
  clock: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);


app.get('/dates', async (req, res) => {
  let dates = await Appointment.find()
  res.json(dates)

})

app.post('/apps', (req, res) => {
  console.log(req.body)
  const appoint = new Appointment(req.body);
  appoint.save();
  res.send(appoint);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
