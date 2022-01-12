const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Collection = sequelize.define('Collection', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    game_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    timeConstraint: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNotFuture(value) {
                if (value != null) {
                    let nowDate = new Date(),
                        currentMonth = '' + (nowDate.getMonth() + 1),
                        currentDay = '' + nowDate.getDate(),
                        currentYear = '' + nowDate.getFullYear();
                    if (currentMonth.length < 2)
                        currentMonth = '0' + currentMonth;
                    if (currentDay.length < 2)
                        currentDay = '0' + currentDay;
                    const nowString = [currentYear, currentMonth, currentDay].join('-');
                    const valueDate = new Date(value);
                    x = valueDate;
                    const compareToDate = new Date(nowString);
                    if (valueDate.getTime() > compareToDate.getTime()) {
                        throw new Error('Data nie może być z przyszłości')
                    }

                }
            }
        }
    },
    timeOfAccess: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = Collection;