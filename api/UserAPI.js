const UserRepository = require('../repository/sequelize/UserRepository');

exports.getUsers = (request, response, next) => {
    UserRepository.getUsers()
        .then(users => {
            response.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getUserById = (request, response, next) => {
    const userId = request.params.userId;
    UserRepository.getUserById(userId)
        .then(user => {
            if (!user) {
                response.status(404).json({
                    message: 'User with id: ' + userId + ' not found'
                })
            } else {
                response.status(200).json(user);
            }
        });
};

exports.createUser = (request, response, next) => {
    UserRepository.createUser(request.body)
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

exports.updateUser = (request, response, next) => {
    const userId = request.params.userId;
    UserRepository.updateUser(userId, request.body)
        .then(result => {
            response.status(200).json({message: 'User updated!', user: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteUser = (request, response, next) => {
    const userId = request.params.userId;
    UserRepository.deleteUser(userId)
        .then(result => {
            response.status(200).json({message: 'Removed user', user: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};