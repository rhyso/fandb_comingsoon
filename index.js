import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { getSecret } from './secrets.js';
import path from 'path';
import SignUp from './SignUp.js';

const __dirname = path.resolve();

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 5001;

var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    useNewUrlParser: true 
};

// db config -- set your URI from mLab in secrets.js
mongoose.connect(getSecret('dbUri'),options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

router.get('/test', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

router.post('/addEmail', (req, res) => {
    const signups = new SignUp();
    console.log(req.body)
    // body parser lets us use the req.body
    const { email } = req.body;
    if (!email) {
        // we should throw an error. we can do this check on the front end
        return res.json({
            success: false,
            error: 'Sorry something is wrong with the form'
        });
    }
    signups.email = email;
    signups.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.get('/signups', (req, res) => {
    SignUp.find((err, signups) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ ...signups });
    });
});

// router.get('/comments', (req, res) => {
//     Comment.find((err, comments) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true, data: comments });
//     });
// });

// router.post('/comments', (req, res) => {
//     const comment = new Comment();
//     // body parser lets us use the req.body
//     const { author, text } = req.body;
//     if (!author || !text) {
//         // we should throw an error. we can do this check on the front end
//         return res.json({
//             success: false,
//             error: 'You must provide an author and comment root serv'
//         });
//     }
//     comment.author = author;
//     comment.text = text;
//     comment.save(err => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     });
// });



// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

app.use('/api', router);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

// const express = require('express');
// const path = require('path');
// const generatePassword = require('password-generator');

// const app = express();

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Put all API endpoints under '/api'
// app.get('/api/passwords', (req, res) => {
//   const count = 5;

//   // Generate some passwords
//   const passwords = Array.from(Array(count).keys()).map(i =>
//     generatePassword(12, false)
//   )

//   // Return them as json
//   res.json(passwords);

//   console.log(`Sent ${count} passwords`);
// });

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// const port = process.env.PORT || 5000;
// app.listen(port);

// console.log(`Password generator listening on ${port}`);