const express = require('express'),
    fileUpload = require('express-fileupload'),
    app = express(),
    path = require('path'),
    {config} = require('../utils/config');

app.use(fileUpload()); // inject middleware

//render html page to select upload files
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname + "/view/upload.html"));
})

app.post('/upload', (req, res) => {
    // console.log('File Name: '+req.files.sample.name)
    // console.log('File Size: '+req.files.sample.size)
    // console.log('File Size: '+req.files.sample.mimetype)
    if (req.files.sample === undefined) // check is file selected or not
        return res.status(400).send('no file found');
    let file = req.files.sample; // create file object  request.files.fileControlName
    let uploadpath = path.join(__dirname + "/image/" + file.name); // create path where we have to save a file
    // uploading file
    file.mv(uploadpath, (err) => {
        if (err)
        return res.status(400).send(err).end(); // return when any error generate
    });
    res.status(200).send("success") // return success message
});

app.listen(config.port, () => {
    console.log('app run on ', config.port)
});