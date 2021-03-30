const validator = {

    getStudentValidator: function (req, type) {

        let input = {
            create: {
                name: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'student name' })],
                password: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Password' })],
                class_id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Class id' })]
            },
            login: {
                name: ["notEmpty",  req.t('FIELD_REQUIRED', { FIELD: 'student name' })],
                password: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Password' })],
                lat: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Password' })],
                long: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Password' })],
            },
            update: {
                id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'student id' })],
                name: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'student name' })],
                password: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Password' })],
                class_id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'class_id' })],
            },
            fetch: {
                id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'student id' })]
            }
        };

        return input[type];
    },
    getClassValidator: function (req, type) {

        let input = {
            create: {
                name: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Class name' })],
                deptId: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Department Id' })],
            },
            update: {
                id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Class id' })],
                name: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Class name' })],
                deptId: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Department id' })]
            },
        };

        return input[type];
    },
    getDeptValidator: function (req, type) {

        let input = {
            create: {
                name: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Department name' })],
                instId: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Institute Id' })],
            },
            update: {
                id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Department id' })],
                name: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Department name' })],
                instId: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Institute id' })]
            },
        };
        return input[type];
    },
    getInstituteValidator: function (req,type) {

        let input = {
            create: {
                name: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Institute name' })],
                address: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Institute address' })],
            },
            update: {
                id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Institute id' })],
                name: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Institute name' })],
                address: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'address id' })]
            },
        };
        return input[type];
    },
    getCheckingValidator :  function (req,type){
        
        let input = {
            checkin: {
                id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Student' })],
                lat: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'latitude' })],
                long: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'logitude' })],
            },
            status: {
                id: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Student' })],
                date: ["notEmpty", req.t('FIELD_REQUIRED', { FIELD: 'Date' })]
            }
        };
        return input[type];
    }

}

module.exports = validator;