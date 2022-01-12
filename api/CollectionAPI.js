const CollectionRepository = require('../repository/sequelize/CollectionRepository');

exports.getCollections = (request, response, next) => {
    CollectionRepository.getCollections()
        .then(collections => {
            response.status(200).json(collections);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCollectionById = (request, response, next) => {
    const collectionId = request.params.collectionId;
    CollectionRepository.getCollectionById(collectionId)
        .then(collection => {
            if (!collection) {
                response.status(404).json({
                    message: 'Collection with id: ' + collectionId + ' not found'
                })
            } else {
                response.status(200).json(collection);
            }
        });
};

exports.createCollection = (request, response, next) => {
    CollectionRepository.createCollection(request.body)
        .then(newObj => {
            response.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCollection = (request, response, next) => {
    const collectionId = request.params.collectionId;
    CollectionRepository.updateCollection(collectionId, request.body)
        .then(result => {
            response.status(200).json({message: 'Collection updated!', collection: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCollection = (request, response, next) => {
    const collectionId = request.params.collectionId;
    CollectionRepository.deleteCollection(collectionId)
        .then(result => {
            response.status(200).json({message: 'Removed collection', collection: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};