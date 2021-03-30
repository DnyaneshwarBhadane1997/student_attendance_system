const crypto = require('crypto');

let utils = {};

utils.isDefined = (variable) => {

    if (typeof variable == 'boolean') return true;
    return (typeof variable != undefined && typeof variable != "undefined" && variable !== null && variable !== "");
}
utils.isEmptyArray = function(ArrayList){
    if (ArrayList && ArrayList.length > 0) {
        return false;
    }else{
        return true;
     }
}
utils.empty = (mixedVar) => {

    let key, i, len,
        emptyValues = ["undefined", null, false, 0, '', '0', undefined];

    for (i = 0, len = emptyValues.length; i < len; i++) {

        if (mixedVar === emptyValues[i]) {

            return true;
        }
    }

    if (typeof mixedVar === 'object') {

        for (key in mixedVar) {

            return false;
        }

        return true;
    }
    
    return false;
}

utils.encrypt = (text) => {

    let cipher = crypto.createCipher(process.env.CRYPTO_ALGORITHM, process.env.CRYPTO_PASSWORD),
        crypted = cipher.update(text, 'utf8', 'hex');

    crypted += cipher.final('hex');
    return crypted;
}

utils.decrypt = (text) => {

    let decipher = crypto.createDecipher(process.env.CRYPTO_ALGORITHM, process.env.CRYPTO_PASSWORD),
        dec = decipher.update(text, 'hex', 'utf8');

    dec += decipher.final('utf8');
    return dec;
}

utils.log = (val) => {

    console.log(val);
}

utils.logs = (valArray) => {
    console.log(valArray);
}
module.exports = utils;