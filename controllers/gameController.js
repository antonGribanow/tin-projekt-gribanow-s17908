const GameRepository = require('../repository/sequelize/GameRepository');

exports.showGameList = (request, response, next) => {
    GameRepository.getGames()
        .then(games => {
            response.render('pages/games/games-list', {
                games: games,
                navLocation: 'game'
            });
        });
    // response.render('pages/games/games-list', {navLocation : 'game'});
}

exports.showGameForm = (request, response, next) => {
    response.render('pages/games/game-form', {
        game: {},
        pageTitle: 'Nowa gra',
        formMode: 'createNew',
        btnLabel: 'Dodaj grę',
        formAction: '/games-list/add',
        navLocation: 'game',
        validationErrors: []
    });
    // response.render('pages/games/game-form', {navLocation : 'game'});
}

exports.showGameDetails = (request, response, next) => {
    const gameId = request.params.gameId;
    GameRepository.getGameById(gameId)
        .then(game => {
            response.render('pages/games/game-form', {
                game: game,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły gry',
                formAction: '',
                navLocation: 'game',
                validationErrors: []
            });
        });
    // response.render('pages/games/games-details', {navLocation : 'game'});
}

exports.showGameModify = (request, response, next) => {
    const gameId = request.params.gameId;
    GameRepository.getGameById(gameId)
        .then(game => {
            response.render('pages/games/game-form', {
                game: game,
                formMode: 'edit',
                pageTitle: 'Edycja gry',
                btnLabel: 'Zapisz modyfikacje',
                formAction: '/games-list/edit',
                navLocation: 'game',
                validationErrors: []
            });
        });
    // response.render('pages/games/games-modify', {navLocation : 'game'});
};

exports.showGameDelete = (request, response, next) => {
    response.render('pages/games/games-delete', {navLocation: 'game'});
}

exports.addGame = (request, response, next) => {
    const gameData = {...request.body};
    GameRepository.createGame(gameData)
        .then(result => {
            response.redirect('/games-list');
        })
        .catch(err => {
            err.errors.forEach(game => {
                if (game.path.includes('licenceCode') && game.type == 'unique violation') {
                    game.message = "Podany kod licencji jest już używany";
                }
            });
            response.render('pages/games/game-form', {
                game: gameData,
                pageTitle: 'Nowa gra',
                formMode: 'createNew',
                btnLabel: 'Dodaj grę',
                formAction: '/games-list/add',
                navLocation: 'game',
                validationErrors: err.errors
            });
        })
};

exports.updateGame = (request, response, next) => {
    const gameId = request.body._id;
    const gameData = {...request.body};
    GameRepository.updateGame(gameId, gameData)
        .then(result => {
            response.redirect('/games-list');
        })
        .catch(err => {
            err.errors.forEach(game => {
                if (game.path.includes('licenceCode') && game.type == 'unique violation') {
                    game.message = "Podany kod licencji jest już przypisany";
                }
            });
            response.render('pages/games/game-form', {
                game: gameData,
                pageTitle: 'Edycja gry',
                formMode: 'edit',
                btnLabel: 'Zapisz modyfikacje',
                formAction: '/games-list/edit',
                navLocation: 'game',
                validationErrors: err.errors
            })

        })


}

exports.deleteGame = (request, response, next) => {
    const gameId = request.params.gameId;
    GameRepository.deleteGame(gameId)
        .then(() => {
            response.redirect('/games-list');
        });
}


