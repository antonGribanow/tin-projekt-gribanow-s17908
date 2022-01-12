const CollectionRepository = require('../repository/sequelize/CollectionRepository');
const UserRepository = require('../repository/sequelize/UserRepository');
const GameRepository = require('../repository/sequelize/GameRepository');

exports.showCollectionList = (request, response, next) => {
    CollectionRepository.getCollections()
        .then(collections => {
            response.render('pages/collections/collections-list', {
                collection: collections,
                navLocation: 'collection'
            });
        });
    // response.render('pages/collections/collections-list', {navLocation: 'collection'});
}

exports.showCollectionForm = (request, response, next) => {
    response.render('pages/collections/collection-form', {
        collection: {},
        pageTitle: "Nowa kolekcja",
        formMode: 'createNew',
        btnLabel: 'Dodaj kolekcję',
        formAction: '/collections-list/add',
        navLocation: 'collection',
        validationErrors: []
    });
    // response.render('pages/collections/collection-form', {navLocation: 'collection'});
}

exports.showCollectionDetails = (request, response, next) => {
    let allUsers, allGames;
    UserRepository.getUsers()
        .then(user => {
            allUsers = user;
            return GameRepository.getGames();
        })
        .then(game => {
            allGames = game;
            const collectionId = request.params.collectionId;
            return CollectionRepository.getCollectionById(collectionId)
        })
        .then(collection => {
            response.render('pages/collections/collection-form', {
                collection: collection,
                formMode: 'showDetails',
                allUsers: allUsers,
                allGames: allGames,
                pageTitle: 'Szczegóły kolekcji',
                formAction: '',
                navLocation: 'collection',
                validationErrors: []
            })
        });
    // response.render('pages/collections/collections-details', {navLocation: 'collection'});
}

exports.showCollectionModify = (request, response, next) => {
    let allUsers, allGames;
    const collectionId = request.params.collectionId;
    UserRepository.getUsers()
        .then(user => {
            allUsers = user;
            return GameRepository.getGames();
        })
        .then(game => {
            allGames = game;
            // const collectionId = request.params.collectionId;
            return CollectionRepository.getCollectionById(collectionId)
        })
        .then(collection => {
            response.render('pages/collections/collection-form', {
                collection: collection,
                formMode: 'edit',
                allUsers: allUsers,
                allGames: allGames,
                pageTitle: 'Szczegóły kolekcji',
                btnLabel: 'Zapisz modyfikacje',
                formAction: '/collections-list/modify',
                navLocation: 'collection',
                validationErrors: []
            })
        });
    // response.render('pages/collections/collections-modify', {navLocation: 'collection'});
};

exports.showCollectionDelete = (request, response, next) => {
    response.render('pages/collections/collections-delete', {navLocation: 'collection'});
}

exports.showAddCollectionForm = (request, response, next) => {
    let allUsers, allGames;
    UserRepository.getUsers()
        .then(users => {
            allUsers = users;
            return GameRepository.getGames();
        })
        .then(games => {
            allGames = games;
            response.render('pages/collections/collection-form', {
                collection: {},
                formMode: 'createNew',
                allUsers: allUsers,
                allGames: allGames,
                pageTitle: 'Nowa kolekcja',
                btnLabel: 'Dodaj kolekcję',
                formAction: '/collections-list/add',
                navLocation: 'collection',
                validationErrors: []
            });
        });
};

exports.addCollection = (request, response, next) => {
    const collectionData = {...request.body};
    CollectionRepository.createCollection(collectionData)
        .then(result => {
            response.redirect('/collections-list');
        })
        .catch(err => {
            let allUsers, allGames;
            UserRepository.getUsers()
                .then(users => {
                    allUsers = users;
                    return GameRepository.getGames();
                })
                .then(games => {
                    allGames = games;
                    response.render('pages/collections/collection-form', {
                        collection: collectionData,
                        formMode: 'createNew',
                        allUsers: allUsers,
                        allGames: allGames,
                        pageTitle: 'Nowa kolecja',
                        btnLabel: 'Zapisz kolekcję',
                        formAction: '/collections-list/add',
                        navLocation: 'collection',
                        validationErrors: err.errors
                    });
                });
        });
}

exports.updateCollection = (request, response, next) => {
    const collectionId = request.body._id;
    const collectionData = {...request.body};
    CollectionRepository.updateCollection(collectionId, collectionData)
        .then(result => {
            response.redirect('/collections-list')
        })
        .catch(err => {
            let allUsers, allGames;
            UserRepository.getUsers()
                .then(users => {
                    allUsers = users;
                    return GameRepository.getGames();
                })
                .then(games => {
                    allGames = games;
                    return CollectionRepository.getCollectionById(collectionId);
                })
                .then(collections => {
                    response.render('pages/collections/collection-form', {
                        collection: collectionData,
                        formMode: 'edit',
                        allUsers: allUsers,
                        allGames: allGames,
                        pageTitle: 'Edycja kolekcji',
                        btnLabel: 'Zapisz modyfikacje',
                        formAction: '/collections-list/modify',
                        navLocation: 'collection',
                        validationErrors: err.errors
                    })

                })

        });
};

exports.deleteCollection = (request, response, next) => {
    const collectionId = request.params.collectionId;
    CollectionRepository.deleteCollection(collectionId)
        .then(() => {
            response.redirect('/collections-list')
        });
};