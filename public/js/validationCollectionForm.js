function validateForm() {
    const user_id = document.getElementById('user_id');
    const game_id = document.getElementById('game_id');
    const timeConstraint = document.getElementById('timeConstraint');
    const purchaseDate = document.getElementById('purchaseDate');
    const timeOfAccess = document.getElementById('timeOfAccess');

    const errorUser_id = document.getElementById('errorUser_id');
    const errorGame_id = document.getElementById('errorGame_id');
    const errorTimeConstraint = document.getElementById('errorTimeConstraint');
    const errorPurchaseDate = document.getElementById('errorPurchaseDate');
    const errorTimeOfAccess = document.getElementById('errorTimeOfAccess');

    const errorSummary = document.getElementById('errorSummary');

    resetErrors([user_id, game_id, timeConstraint, purchaseDate, timeOfAccess],
        [errorUser_id, errorGame_id, errorTimeConstraint, errorPurchaseDate, errorTimeOfAccess],
        errorSummary);

    let valid = true;

    if (!checkRequired(user_id.value)) {
        valid = false;
        user_id.classList.add("error-input");
        errorUser_id.innerText = "To pole jest wymagane";
    }

    if (!checkRequired(game_id.value)) {
        valid = false;
        game_id.classList.add("error-input");
        errorGame_id.innerText = "To pole jest wymagane";
    }

    if (!checkRequired(timeConstraint.value)) {
        valid = false;
        timeConstraint.classList.add("error-input");
        errorTimeConstraint.innerText = "To pole jest wymagane";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    const currentDate = [year, month, day].join('-');

    if (!checkRequired(purchaseDate.value)) {
        valid = false;
        purchaseDate.classList.add("error-input");
        errorPurchaseDate.innerText = "To pole jest wymagane";
    } else if (!checkDate(purchaseDate.value)) {
        valid = false;
        purchaseDate.classList.add("error-input");
        errorPurchaseDate.innerText = "Pole powinno zawierać datę w formacie yyyy-mm-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(purchaseDate.value, currentDate)) {
        valid = false;
        purchaseDate.classList.add("error-input");
        errorPurchaseDate.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(timeOfAccess.value)) {
        valid = false;
        timeOfAccess.classList.add("error-input");
        errorTimeOfAccess.innerText = "Pole jest wymagane";
    } else if (timeOfAccess.value < 1) {
        valid = false;
        timeOfAccess.classList.add("error-input");
        errorTimeOfAccess.innerText = "Pole powinno zawierać wartość powyżej 1";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}