app.controller("UsersCtrl",
    ['$scope', '$location', '$routeParams', 'User', function ($scope, $location, $routeParams, User) {

        $scope.isUserLoad = false;
        $scope.query = {
            limit: 25,
            page: 1,
            search: '',
            sort: 'name',
            order: 1
        };

        $scope.gridOptions = {
            paginationPageSizes: [25, 50, 100, 250, 500, 1000],
            paginationPageSize: 25,
            useExternalPagination: true,
            useExternalSorting: true,
            columnDefs: [
                {displayName: 'Name', name: 'name', minWidth: 125, maxWidth: 125, enableHiding: false},
                {displayName: 'Gender', name: 'gender', minWidth: 80, maxWidth: 80, enableHiding: false},
                {displayName: 'Email', name: 'email', minWidth: 100, enableHiding: false},
                {displayName: 'Phone', name: 'phone', minWidth: 140, maxWidth: 140, enableHiding: false},
                {displayName: 'Age', name: 'age', minWidth: 55, maxWidth: 55, enableHiding: false},
                {displayName: 'Eye Color', name: 'eyeColor', minWidth: 95, maxWidth: 95, enableHiding: false},
                {displayName: 'Company', name: 'company', minWidth: 100, maxWidth: 100, enableHiding: false},
                {
                    displayName: 'Balance',
                    name: 'balance',
                    minWidth: 80,
                    maxWidth: 80,
                    cellFilter: 'currency',
                    enableHiding: false
                },
                {
                    displayName: 'Registered',
                    name: 'registered',
                    minWidth: 125,
                    maxWidth: 125,
                    cellFilter: 'date:\'yyyy-MM-dd HH:MM\'',
                    enableHiding: false
                },
                {
                    name: 'Action',
                    cellTemplate: '<div class="ui-grid-cell-contents">'
                    + '<a href="javascript:void(0)" ng-href="#/users/{{row.entity._id}}"><i class="glyphicon glyphicon-edit"></i></a> | '
                    + '<a href="javascript:void(0)" class="text-danger" ng-click="grid.appScope.fnRemoveUser(row.entity._id)"><i class="glyphicon glyphicon-trash"></i></a></div>',
                    minWidth: 70,
                    maxWidth: 70,
                    enableFiltering: false,
                    enableColumnMenu: false,
                    enableSorting: false
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length === 0) {
                        $scope.query.sort = 'name';
                        $scope.query.order = 1;
                    } else {
                        $scope.query.sort = sortColumns[0].name;
                        $scope.query.order = sortColumns[0].sort.direction === 'asc' ? 1 : -1;
                    }
                    $scope.fnGetUsers($scope.query);
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    $scope.query.page = newPage;
                    $scope.query.limit = pageSize;
                    $scope.fnGetUsers($scope.query);
                });
            }
        };

        $scope.fnGetUsers = function (query) {
            $scope.isUserLoad = true;
            User.query(query, function (data) {
                $scope.gridOptions.totalItems = data.totDocument;
                $scope.gridOptions.data = data.users;
                $scope.isUserLoad = false;
            }, function (error) {
                toastr.error(error.data.message, error.status + ' : ' + error.statusText);
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
