const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express();
app.use(express.json({ extended: false }));

app.use('/user', require('./routes/user'));
app.use('/card', require('./routes/card'))

if(process.env.NODE_ENV === 'production') {
    //Set static folder:
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Your server is running on ${PORT}`));
