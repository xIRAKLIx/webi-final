const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb+srv://iraklichelidze32:barobaro123@cluster0.gbos2qh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = { connectDatabase };