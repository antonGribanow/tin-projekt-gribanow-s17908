const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const User = sequelize.define('User', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    userSurname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },
    premiumSub: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5, 60],
                msg: "Pole powinno zawierać od 5 do 60 znaków"
            },
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy adres email"
            }
        }
    },
    userBirthDate: {
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
    }
});
module.exports = User;
