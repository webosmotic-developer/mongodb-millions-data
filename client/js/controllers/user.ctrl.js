app.controller("UserCtrl",
    ['$scope', '$location', '$routeParams', 'User',
        function ($scope, $location, $routeParams, User) {

            $scope.user = {};

            $scope.fnSaveUser = function (userObj) {
                var user = new User(userObj);
                if (userObj._id) {
                    user.$update(function () {
                        toastr.success('User updated');
                        $location.path('/');
                    });
                } else {
                    user.$save(function () {
                        toastr.success('User created');
                        $location.path('/');
                    });
                }
            };

            $scope.fnFindOne = function () {
                if ($routeParams.userId && $routeParams.userId !== 'add') {
                    User.get({
                        userId: $routeParams.userId
                    }, function (user) {
                        $scope.user = user;
                    });
                }
            };
        }
    ]);
