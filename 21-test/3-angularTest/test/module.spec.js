(function () {
    describe('homeCtrl', function () {
        beforeEach(module('testModule'));   //构建模块
        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('homeCtrl', {$scope: $scope});
        }));
        it('正确的title', injector(function () {
            expect($scope.title == 'infonx').toBeTruthy();
        }))
    })
});