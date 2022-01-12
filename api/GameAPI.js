const GameRepository = require('../repository/sequelize/GameRepository');

exports.getGames = (request, response, next) => {
    GameRepository.getGames()
        .then(games => {
            response.status(200).json(games);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getGameById = (request, response, next) => {
    const gameId = request.params.gameId;
    GameRepository.getGameById(gameId)
        .then(game => {
            if (!game) {
                response.status(404).json({
                    message: 'Game with id: ' + gameId + ' not found'
                })
            } else {
                response.status(200).json(game);
            }
        });
};

exports.createGame = (request, response, next) => {
    GameRepository.createGame(request.body)
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

exports.updateGame = (request, response, next) => {
    const gameId = request.params.gameId;
    GameRepository.updateGame(gameId, request.body)
        .then(result => {
            response.status(200).json({message: 'Game updated!', game: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteGame = (request, response, next) => {
    const gameId = request.params.gameId;
    GameRepository.deleteGame(gameId)
        .then(result => {
            response.status(200).json({message: 'Removed game', game: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};