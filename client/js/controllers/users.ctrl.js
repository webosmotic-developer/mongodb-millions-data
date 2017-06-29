app.controller("UsersCtrl",
    ['$scope', '$location', '$routeParams', 'User', function ($scope, $location, $routeParams, User) {

        $scope.isUserLoad = false;
        $scope.limits = [10, 25, 50, 100, 250, 500, 1000];

        $scope.sortBy = [
            {name: 'Age', value: 'age'},
            {name: 'Balance', value: 'balance'},
            {name: 'Company', value: 'company'},
            {name: 'Eye Color', value: 'eyeColor'},
            {name: 'Gender', value: 'gender'},
            {name: 'Name', value: 'name'},
            {name: 'Email', value: 'email'},
            {name: 'Phone', value: 'phone'},
            {name: 'Registered', value: 'registered'}];

        $scope.orderBy = [
            {name: 'Ascending', value: 1},
            {name: 'Descending', value: -1}];

        $scope.query = {
            limit: $scope.limits[0],
            page: 1,
            search: '',
            sort: 'name',
            order: 1
        };

        $scope.fnNext = function (query) {
            query.page++;
            $scope.fnGetUsers(query);
        };

        $scope.fnPrevious = function (query) {
            query.page--;
            $scope.fnGetUsers(query);
        };

        $scope.fnGetUsers = function (query) {
            $scope.isUserLoad = true;
            User.query(query, function (users) {
                $scope.users = users;
                $scope.isUserLoad = false;
            });
        };

        $scope.fnRemoveUser = function (id) {
            var isDelete = confirm('Would like to delete this user?');
            if (isDelete) {
                User.delete({userId: id}, function () {
                    $scope.fnGetUsers($scope.query);
                });
            }
        };

        $scope.fnInitUsers = function () {
            $scope.fnGetUsers($scope.query);
        };
    }]);