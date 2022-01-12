function validateForm() {
    const userName = document.getElementById('userName');
    const userSurname = document.getElementById('userSurname');
    const emailAddress = document.getElementById('emailAddress');
    const userBirthDate = document.getElementById('userBirthDate');
    const premiumSub = document.getElementById('premiumSub');

    const errorUserName = document.getElementById('errorUserName');
    const errorUserSurname = document.getElementById('errorUserSurname');
    const errorEmailAddress = document.getElementById('errorEmailAddress');
    const errorUserBirthDate = document.getElementById('errorUserBirthDate');
    const errorPremiumSub = document.getElementById('errorPremiumSub');

    const errorSummary = document.getElementById('errorSummary');

    resetErrors([userName, userSurname, emailAddress, userBirthDate, premiumSub], [errorUserName, errorUserSurname, errorEmailAddress, errorUserBirthDate, errorPremiumSub], errorSummary);

    let valid = true;

    if (!checkRequired(userName.value)) {
        valid = false;
        userName.classList.add("error-input");
        errorUserName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(userName.value, 2, 60)) {
        valid = false;
        userName.classList.add("error-input");
        errorUserName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(userSurname.value)) {
        valid = false;
        userSurname.classList.add("error-input");
        errorUserSurname.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(userSurname.value, 2, 60)) {
        valid = false;
        userSurname.classList.add("error-input");
        errorUserSurname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(emailAddress.value)) {
        valid = false;
        emailAddress.classList.add("error-input");
        errorEmailAddress.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(emailAddress.value, 5, 60)) {
        valid = false;
        emailAddress.classList.add("error-input");
        errorEmailAddress.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkEmail(emailAddress.value)) {
        valid = false;
        emailAddress.classList.add("error-input");
        errorEmailAddress.innerText = "Pole powinno zawierać prawidłowy adres email";
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

    if (!checkRequired(userBirthDate.value)) {
        valid = false;
        userBirthDate.classList.add("error-input");
        errorUserBirthDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(userBirthDate.value)) {
        valid = false;
        userBirthDate.classList.add("error-input");
        errorUserBirthDate.innerText = "Pole powinno zawierać datę w formacie yyyy-mm-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(userBirthDate.value, currentDate)) {
        valid = false;
        userBirthDate.classList.add("error-input");
        errorUserBirthDate.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(premiumSub.value)) {

        valid = false;
        premiumSub.classList.add("error-input");
        errorPremiumSub.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}