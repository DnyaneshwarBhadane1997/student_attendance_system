
let classUtil = {};

classUtil.classDetail = (data) => {

    let classObj = {},
        selectData = [
            "name",
            "deptId"
        ];

    _(selectData).forEach(function (val) {
        classObj[val] = data[val];
    });
    
    return classObj;
};

module.exports = classUtil