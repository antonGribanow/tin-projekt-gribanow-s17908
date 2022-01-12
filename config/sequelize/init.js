const sequelize = require('./sequelize');

const User = require('../../model/sequelize/User');
const Game = require('../../model/sequelize/Game');
const Collection = require('../../model/sequelize/Collection');

module.exports = () => {
    User.hasMany(Collection, {
        as: 'collections', foreignKey:
            {
                name: 'user_id',
                allowNull: false,
                constraints: true,
                onDelete: 'CASCADE'
            }
    });
    Collection.belongsTo(User, {
        as: 'user', foreignKey:
            {
                name: 'user_id',
                allowNull: false
            }
    });

    Game.hasMany(Collection, {
        as: 'collections', foreignKey:
            {
                name: 'game_id',
                allowNull: false,
                constraints: true,
                onDelete: 'CASCADE'
            }
    });
    Collection.belongsTo(Game, {
        as: 'game', foreignKey:
            {
                name: 'game_id',
                allowNull: false
            }
    });

    let allUsers, allGames;
    return sequelize
        .sync({force: true})
        .then(() => {
            return User.findAll();
        })
        .then(users => {
            if (!users || users.length == 0) {
                return User.bulkCreate([
                    {
                        userName: 'Vladimir Vladimirovich',
                        userSurname: 'Putin',
                        premiumSub: true,
                        emailAddress: 'nasharasha@USSR.RU',
                        userBirthDate: '1980-10-10'
                    },
                    {
                        userName: 'Bartek',
                        userSurname: 'Kowalski',
                        premiumSub: true,
                        emailAddress: 'kowaski@mail.com',
                        userBirthDate: '1975-11-23'
                    },
                    {
                        userName: 'Grzegorz',
                        userSurname: 'Brzęczyszczykiewicz',
                        premiumSub: true,
                        emailAddress: 'Brzęczyszczykiewicz@gmail.com',
                        userBirthDate: '1980-10-10'
                    },
                    {
                        userName: 'Grarzyna',
                        userSurname: 'Kowalska',
                        premiumSub: true,
                        emailAddress: 'kowalskab@o2.pl',
                        userBirthDate: '1910-02-15'
                    }
                ])
                    .then(() => {
                        return User.findAll();
                    });
            } else {
                return users
            }
        })
        .then(users => {
            allUsers = users;
            return Game.findAll();
        })
        .then(games => {
            if (!games || games.length == 0) {
                return Game.bulkCreate([
                    {
                        gameName: 'Red Dead Redemption II',
                        licenceCode: 'EEEP694201234',
                        ageRestriction: true
                    },
                    {
                        gameName: 'Detroit - Become Human',
                        licenceCode: 'GGSS123469420',
                        ageRestriction: true
                    },
                    {
                        gameName: 'Euro Truck Simulator 2',
                        licenceCode: 'JFYP432169420',
                        ageRestriction: false
                    },
                    {
                        gameName: 'Dark Souls III',
                        licenceCode: 'KJYO346942043',
                        ageRestriction: true
                    },
                ])
                    .then(() => {
                        return User.findAll();
                    });
            } else {
                return games;
            }
        })
        .then(games => {
            allGames = games;
            return Collection.findAll();
        })
        .then(collections => {
            if (!collections || collections == 0) {
                return Collection.bulkCreate([
                    {
                        user_id: allUsers[0]._id,
                        game_id: allGames[0]._id,
                        timeConstraint: true,
                        purchaseDate: '2020-11-11',
                        timeOfAccess: 21
                    },
                    {
                        user_id: allUsers[3]._id,
                        game_id: allGames[3]._id,
                        timeConstraint: true,
                        purchaseDate: '2020-11-11',
                        timeOfAccess: 44
                    },
                    {
                        user_id: allUsers[3]._id,
                        game_id: allGames[2]._id,
                        timeConstraint: true,
                        purchaseDate: '2020-11-10',
                        timeOfAccess: 7
                    }
                ]);
            } else {
                return collections;
            }
        });
};