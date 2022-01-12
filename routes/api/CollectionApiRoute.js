const express = require('express');
const router = express.Router();

const collectionApiController = require('../../api/CollectionAPI');

router.get('/', collectionApiController.getCollections);
router.get('/:collectionId', collectionApiController.getCollectionById);
router.post('/', collectionApiController.createCollection);
router.put('/:collectionId', collectionApiController.updateCollection);
router.delete('/:collectionId', collectionApiController.deleteCollection);

module.exports = router;