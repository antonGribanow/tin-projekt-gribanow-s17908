const User = require("../../model/sequelize/User");
const Collection = require("../../model/sequelize/Collection");
const Game = require("../../model/sequelize/Game");

exports.getGames = () => {
    return Game.findAll();
};

exports.getGameById = (gameId) => {
    return Game.findByPk(gameId,
        {
            include: [{
                model: Collection,
                as: 'collections',
                include: [{
                    model: User,
                    as: 'user'
                }]
            }]
        });
};

exports.createGame = (newGameData) => {
    return Game.create({
        gameName: newGameData.gameName,
        licenceCode: newGameData.licenceCode,
        ageRestriction: newGameData.ageRestriction
    });
};

exports.updateGame = (gameId, gameData) => {
    const gameName = gameData.gameName;
    const licenceCode = gameData.licenceCode;
    const ageRestriction = gameData.ageRestriction;
    return Game.update(gameData, {where: {_id: gameId}});
};

exports.deleteGame = (gameId) => {
    return Game.destroy({
        where: {_id: gameId}
    });

};