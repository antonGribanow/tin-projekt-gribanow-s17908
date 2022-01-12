const User = require("../../model/sequelize/User");
const Collection = require("../../model/sequelize/Collection");
const Game = require("../../model/sequelize/Game");

exports.getUsers = () => {
    return User.findAll();
};

exports.getUserById = (userId) => {
    return User.findByPk(userId,
        {
            include: [{
                model: Collection,
                as: 'collections',
                include: [{
                    model: Game,
                    as: 'game'
                }]
            }]
        });
};

exports.createUser = (newUserData) => {
    return User.create({
        userName: newUserData.userName,
        userSurname: newUserData.userSurname,
        premiumSub: newUserData.premiumSub,
        emailAddress: newUserData.emailAddress,
        userBirthDate: newUserData.userBirthDate
    });
};

exports.updateUser = (userId, userData) => {
    const userName = userData.userName;
    const userSurname = userData.userSurname;
    const premiumSub = userData.premiumSub;
    const emailAddress = userData.emailAddress;
    const userBirthDate = userData.userBirthDate;
    return User.update(userData, {where: {_id: userId}});
};

exports.deleteUser = (userId) => {
    return User.destroy({
        where: {_id: userId}
    });

};