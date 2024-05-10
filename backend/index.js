const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

  mongoose.connect('mongodb+srv://mugeskumar3:jlGkAgeZeQaUhh3Q@cluster0.aqgewzu.mongodb.net/MERCHANT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
const Schema = mongoose.Schema;

// Define your MongoDB schema
const formDataSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  website: String,
  contactName: String,
  contactPhone: String,
  contactEmail: String,
  notes: String,
  type: String,
  category: String,
  commissionPercentage: Number,
  chooseDate: String,
  logo: String,
  isCriticalAccount:String,
  paymentOptions: String,
});

// Create a model based on the schema
const FormDataModel = mongoose.model('FormData', formDataSchema);

// API endpoint to get all form data
app.get('/api/data', async (req, res) => {
  try {
    const formData = await FormDataModel.find();
    res.json(formData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to add new form data
app.post('/api/data', async (req, res) => {
  try {
      // Convert phone number to a standardized format if needed
      req.body.phone = req.body.phone.replace(/\D/g, ""); // Remove non-numeric characters
    const newFormData = new FormDataModel(req.body);
    // Log the received data in the terminal
    console.log('Received data:', req.body);
    const savedFormData = await newFormData.save();
    res.json(savedFormData);
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to update form data
app.put('/api/data/:id', async (req, res) => {
  try {
     // Convert phone number to a standardized format if needed
     req.body.phone = req.body.phone.replace(/\D/g, ""); // Remove non-numeric characters
    const updatedFormData = await FormDataModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFormData);
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to delete form data
app.delete('/api/data/:id', async (req, res) => {
  try {
    const deletedFormData = await FormDataModel.findByIdAndDelete(req.params.id);
    res.json(deletedFormData);
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
