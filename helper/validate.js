const utils = require('./utils');

let validator = {};

validator.isValid = (str) => {

    if (typeof str !== 'string' || utils.empty(str)) {

        return false;
    }
    
    return true;
}

validator.notEmpty = (str) => {

    return !utils.empty(str);
}

validator.isEmail = (str) => {

    if (validator.isValid(str)) {

        let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.test(str);
    }

    return false;
}

validator.isValidPassword = (str) => {

    if (validator.isValid(str)) {

        let password = /^(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,30}$/;
        return password.test(str);
    }

    return false;
}

let validate = (input, props, type) => {

    let error = "";

    for (var k in props) {

        if (props.hasOwnProperty(k)) {

            let inputName = k,
                validationData = props[k];

            if (!utils.empty(validationData)) {

                let validationFunction = validationData[0] || notEmpty,
                    errorMessage = validationData[1] || "Please enter input.",
                    options = validationData[2];

                if (!validator[validationFunction](input[inputName], options)) {

                    error = errorMessage;
                    break;
                }
            }
        }
    }

    return error;
}

module.exports = {
    validate: validate,
};