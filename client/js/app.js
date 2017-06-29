var app = angular.module('NodeCRUD', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/users', {
            templateUrl: '/views/users.html',
            controller: 'UsersCtrl'
        })
        .when('/users/:userId', {
            templateUrl: '/views/user.html',
            controller: 'UserCtrl'
        })
        .otherwise({redirectTo: '/users'});
});