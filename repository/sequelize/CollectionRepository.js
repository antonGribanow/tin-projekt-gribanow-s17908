// const Sequelize = require('sequelize');

const Collection = require('../../model/sequelize/Collection');
const User = require('../../model/sequelize/User');
const Game = require('../../model/sequelize/Game');

exports.getCollections = () => {
    return Collection.findAll({
        include: [
            {
                model: User,
                as: 'user'
            },
            {
                model: Game,
                as: 'game'
            }
        ]
    });
};

exports.getCollectionById = (collectionId) => {
    return Collection.findByPk(collectionId, {
        include: [
            {
                model: User,
                as: 'user'
            },
            {
                model: Game,
                as: 'game'
            }
        ]
    });
};

exports.createCollection = (data) => {
    console.log(JSON.stringify(data));

    return Collection.create({
        user_id: data.user_id,
        game_id: data.game_id,
        timeConstraint: data.timeConstraint,
        purchaseDate: data.purchaseDate,
        timeOfAccess: data.timeOfAccess
    });
};

exports.updateCollection = (collectionId, data) => {
    return Collection.update(data, {where: {_id: collectionId}});
};

exports.deleteCollection = (collectionId) => {
    return Collection.destroy({
        where: {_id: collectionId}
    });
};
``
exports.deleteManyCollections = (collectionIds) => {
    return Collection.find({
        _id: {[Sequelize.Op.in]: collectionIds}
    });
};