const express = require ('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID

const storage = multer.diskStorage({
    destination: './client/build/',
    filename: function(req, file, cb){
            cb(null,file.fieldname + '-' + Date.now() + 
            path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage,
    fileFilter:function (req, file, cb){
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb){
    const filetypes = /jpg|png|jpeg|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Images Only');
    }
}
module.exports = {
    'secret': 'supersecret'
  };


module.exports = function(app, db){
    
    //Handles Retrieve Employees
    app.post('/Retrieve', (req, res) => {
        const id = req.body.orgID;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').find({}).toArray((err, item2)=>{
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
              const item =   item2.filter((data)=>{
                  return  data.details.orgID == id
                });
                res.send({item});
            }
        });
    });

    app.get('/*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client/build','index.html'));
        });

    //Handles Delete Employee
    app.delete('/Delete/:id', (req, res) => {
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

    //Handles Edit Employee
    app.put('/Edit/:id',upload.single('avatar'), (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {details:{orgID:req.body.orgID,firstname: req.body.firstname, lastname: req.body.lastname, dob: req.body.dob
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

    //Handles Add Employee
    app.post('/notes',upload.single('avatar'), (req, res) => {

        const note = {details:{orgID:req.body.id,firstname: req.body.firstname, lastname: req.body.lastname, dob: req.body.dob
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

    //Handles User Login

    app.post('/Login', (req,res) =>{
            const userLogin = {username: req.body.username, password:req.body.password};
            db.collection('users').findOne({username:req.body.username},(err,result)=>{
                if(result === null){
                    res.send({'error':'No User'});      
                }else if(result.username === req.body.username && bcrypt.compareSync(req.body.password, result.password)){
                    
                    res.send({'token':result._id});
                } else{
                    res.send({'Error':'Invalid Login Details. Try Again'})
                }
            });
    });

    //Handles User Registeration
    app.post('/Register', (req,res)=>{
        const hashpassword = bcrypt.hashSync(req.body.password, 10);
        const userRegister = {organization:req.body.organization,username: req.body.username, email:req.body.email,
            password:hashpassword
         }
         db.collection('users').insert(userRegister, (err,result)=>{
            if(err){
                res.send({'Error':'User not Registered. Try Again'});
            }else {
                res.send({'Success':'Great! User registered'});
            }
         });
    });
};