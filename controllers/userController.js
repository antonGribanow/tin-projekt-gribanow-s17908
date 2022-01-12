const UserRepository = require('../repository/sequelize/UserRepository');

exports.showUserList = (request, response, next) => {
    UserRepository.getUsers()
        .then(users => {
            response.render('pages/users/users-list', {
                users: users,
                navLocation: 'user'
            });
        });
    // response.render('pages/users/users-list', {navLocation : 'user'});
}

exports.showUserForm = (request, response, next) => {
    response.render('pages/users/user-form', {
        user: {},
        pageTitle: 'Nowy użytkownik',
        formMode: 'createNew',
        btnLabel: 'Dodaj użytkownika',
        formAction: '/users-list/add',
        navLocation: 'user',
        validationErrors: []
    });
    // response.render('pages/users/user-form', {navLocation : 'user'});
}

exports.showUserDetails = (request, response, next) => {
    const userId = request.params.userId;
    UserRepository.getUserById(userId)
        .then(user => {
            response.render('pages/users/user-form', {
                user: user,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły użytkownika',
                formAction: '',
                navLocation: 'user',
                validationErrors: []
            })
        })
    // response.render('pages/users/users-details', {navLocation : 'user'});
}

exports.showUserModify = (request, response, next) => {
    const userId = request.params.userId;
    UserRepository.getUserById(userId)
        .then(user => {
            response.render('pages/users/user-form', {
                user: user,
                formMode: 'edit',
                pageTitle: 'Edycja użytkownika',
                btnLabel: 'Zapisz modyfikacje',
                formAction: '/users-list/edit',
                navLocation: 'user',
                validationErrors: []
            });
        });
    // response.render('pages/users/users-modify', {navLocation : 'user'});
}

exports.showUserDelete = (request, response, next) => {
    response.render('pages/users/users-delete', {navLocation: 'user'});
}

exports.addUser = (request, response, next) => {
    const userData = {...request.body};
    UserRepository.createUser(userData)
        .then(result => {
            response.redirect('/users-list');
        })
        .catch(err => {
            err.errors.forEach(user => {
                if (user.path.includes('emailAddress') && user.type == 'unique violation') {
                    user.message = "Podany adres email jest już używany";
                }
            });
            response.render('pages/users/user-form', {
                user: userData,
                pageTitle: 'Nowy użytkownik',
                formMode: 'createNew',
                btnLabel: 'Dodaj użytkownika',
                formAction: '/users-list/add',
                navLocation: 'user',
                validationErrors: err.errors
            });
        })

};

exports.updateUser = (request, response, next) => {
    const userId = request.body._id;
    const userData = {...request.body};
    UserRepository.updateUser(userId, userData)
        .then(result => {
            response.redirect('/users-list');
        })
        .catch(err => {
            err.errors.forEach(user => {
                if (user.path.includes('emailAddress') && user.type == 'unique violation') {
                    user.message = "Podany adres email jest już używany";
                }
            });
            response.render('pages/users/user-form', {
                user: userData,
                pageTitle: 'Edycja użytkownika',
                formMode: 'edit',
                btnLabel: 'Zapisz modyfikacje',
                formAction: '/users-list/edit',
                navLocation: 'user',
                validationErrors: err.errors
            });
        })
};
exports.deleteUser = (request, response, next) => {
    const userId = request.params.userId;
    UserRepository.deleteUser(userId)
        .then(() => {
            response.redirect('/users-list');
        });
};

