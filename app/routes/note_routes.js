const express = require ('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
var ObjectID = require('mongodb').ObjectID

const storage = multer.diskStorage({
    destination: './client/build/',
    filename: function(req, file, cb){
            cb(null,file.fieldname + '-' + Date.now() + 
            path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage
});



module.exports = function(app, db){
    app.get('/notes', (req, res) => {
       
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
         
        db.collection('notes').find({}).toArray(function(err, item){
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                
                res.send({item});
            }
        });
        // res.sendFile(path.resolve(__dirname, 'client/build','index.html'));

    });

    app.get('/notes', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client/build','index.html'));
        });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err, item)=>{
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });

    });

    app.put('/notes/:id',upload.single('avatar'), (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {details:{firstname: req.body.firstname, lastname: req.body.lastname, dob: req.body.dob
            , gender: req.body.gender, department: req.body.department, role: req.body.role
            , phone: req.body.phone, email: req.body.email, address: req.body.address, imgpath:req.file.filename}};
        db.collection('notes').update(details, note, (err, item)=>{
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(item);
            }
        });

    });
    app.post('/notes',upload.single('avatar'), (req, res) => {

        const note = {details:{firstname: req.body.firstname, lastname: req.body.lastname, dob: req.body.dob
                        , gender: req.body.gender, department: req.body.department, role: req.body.role
                        , phone: req.body.phone, email: req.body.email, address: req.body.address, imgpath:req.file.filename}};
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(result.ops[0])
            }
        });
    });
};