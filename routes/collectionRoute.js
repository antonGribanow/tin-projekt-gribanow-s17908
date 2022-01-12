const express = require('express');
const router = express.Router();

const collectionController = require('../controllers/collectionController');

router.get('/', collectionController.showCollectionList);
router.get('/add', collectionController.showAddCollectionForm);
router.post('/add', collectionController.addCollection);
router.get('/details/:collectionId', collectionController.showCollectionDetails);
router.get('/modify/:collectionId', collectionController.showCollectionModify);
router.get('/delete', collectionController.showCollectionDelete);
router.get('/delete/:collectionId', collectionController.deleteCollection);
router.post('/modify', collectionController.updateCollection);

module.exports = router;