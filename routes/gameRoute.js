const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');

router.get('/', gameController.showGameList);
router.get('/add', gameController.showGameForm);
router.post('/add', gameController.addGame);
// router.get('/details/:userId', userController.showUserDetails);
router.get('/details/:gameId', gameController.showGameDetails);
router.get('/modify/:gameId', gameController.showGameModify);
router.post('/edit', gameController.updateGame);
router.get('/delete', gameController.showGameDelete);
router.get('/delete/:gameId', gameController.deleteGame);

module.exports = router;