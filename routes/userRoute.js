const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.showUserList);
router.get('/add', userController.showUserForm);
router.get('/details/:userId', userController.showUserDetails);
// router.get('/details', userController.showUserDetails);
router.get('/modify/:userId', userController.showUserModify);
// router.get('/delete', userController.showUserDelete);
router.post('/add', userController.addUser);
router.post('/edit', userController.updateUser);
router.get('/delete/:userId', userController.deleteUser);
module.exports = router;