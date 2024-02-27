const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:1234@cluster0.15yio0y.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Create a Mongoose model for the contact form data
const Contact = mongoose.model('Contact', {
    name: String,
    email: String,
    message: String,
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
      // Create a new instance of the Contact model with the form data
      const contact = new Contact({
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
      });
      console.log(req.body.name);
      // Save the contact data to the database
      await contact.save();

      // Respond with a success message
      res.send('<script>alert("Submitted Successfully"); window.location="/";</script>');

  } catch (error) {
      // Respond with an error message if there was a problem saving the data
      res.send('<script>alert("Error Submitting"); window.location="/";</script>');
  }
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
