const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

//Public Route
//Create User
router.post('/register', userController.createUser);


//Protected Route
//Get All User
router.get('/getAll', authenticate, userController.getAllUser);

//Get User's By Id
router.get('/id/:id', authenticate, userController.getById);

//Get User by Name
router.get('/name/:name', authenticate, userController.getByName);

//Get User by Email
router.get('/email/:email', authenticate, userController.getByEmail);

//Update User by Id
router.put('/update/:id', authenticate, userController.updateById);

//Change User's isActive by Id
router.patch('/changeActive/:id', authenticate, userController.changeActiveById);

//Change User's Password by Id
router.patch("/me/password", authenticate, userController.changePassword);

module.exports = router;