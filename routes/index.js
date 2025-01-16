// const express = require('express');

// const router = express.Router();
// const AppController = require('../controllers/AppController');
// const UsersController = require('../controllers/UsersController');

// const AuthController = require('../controllers/AuthController')


// router.get('/status', AppController.getStatus);
// router.get('/stats', AppController.getStats);
// router.post('/users', UsersController.postNew);
// router.get('/connect', AuthController.getConnect);
// router.get('/disconnect', AuthController.getDisconnect)
// router.get('/users/me', UsersController.getMe)

// module.exports = router;


import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';


function controllerRouting(app) {
    const router = express.Router();
    app.use('/', router);
  
    // App Controller
  
    // should return if Redis is alive and if the DB is alive
    router.get('/status', (req, res) => {
      AppController.getStatus(req, res);
    });
  
    // should return the number of users and files in DB
    router.get('/stats', (req, res) => {
      AppController.getStats(req, res);
    });
  
    // User Controller
  
    // should create a new user in DB
    router.post('/users', (req, res) => {
      UsersController.postNew(req, res);
    });
  
    // should retrieve the user base on the token used
    router.get('/users/me', (req, res) => {
      UsersController.getMe(req, res);
    });
  
    // Auth Controller
  
    // should sign-in the user by generating a new authentication token
    router.get('/connect', (req, res) => {
      AuthController.getConnect(req, res);
    });
  
    // should sign-out the user based on the token
    router.get('/disconnect', (req, res) => {
      AuthController.getDisconnect(req, res);
    });

    router.post('/files', (req, res) => {
        FilesController.postUpload(req, res);
      });
  
 }
  
  export default controllerRouting;