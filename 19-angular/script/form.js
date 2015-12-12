var myApp = angular.module('myApp', []);
myApp.controller('formTest', function ($scope) {
    $scope.user = {
        name: '',
        email: '',
        phone: '',
        password: '',
        sex: '',
        homepage: '',
        other: '',
        work: '',
        intro: ''
    };
    $scope.message = '';

    //数据添加到数据库
    $scope.addUser = function (isValid) {
        if (!isValid) {
            alert('验证不通过');
        }
    }
});