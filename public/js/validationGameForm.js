function validateForm() {
    const gameName = document.getElementById('gameName');
    const licenceCode = document.getElementById('licenceCode');
    const ageRestriction = document.getElementById('ageRestriction');

    const errorGameName = document.getElementById('errorGameName');
    const errorLicenceCode = document.getElementById('errorLicenceCode');
    const errorAgeRestriction = document.getElementById('errorAgeRestriction');

    const errorSummary = document.getElementById('errorSummary');

    resetErrors([gameName, licenceCode, ageRestriction], [errorGameName, errorLicenceCode, errorAgeRestriction], errorSummary);

    let valid = true;

    if (!checkRequired(gameName.value)) {
        valid = false;
        gameName.classList.add("error-input");
        errorGameName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(gameName.value, 2, 60)) {
        valid = false;
        gameName.classList.add("error-input");
        errorGameName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(licenceCode.value)) {
        valid = false;
        licenceCode.classList.add("error-input");
        errorLicenceCode.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(licenceCode.value, 13, 13)) {
        valid = false;
        licenceCode.classList.add("error-input");
        errorLicenceCode.innerText = "Kod licencji powinien składać się z 13 znaków";
    }

    if (!checkRequired(ageRestriction.value)) {
        valid = false;
        ageRestriction.classList.add("error-input");
        errorAgeRestriction.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

}