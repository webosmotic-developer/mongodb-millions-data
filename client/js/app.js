var app = angular.module('MongoDBMillionsData', ['ngRoute', 'ngResource', 'ui.grid', 'ui.grid.pagination']);

app.config(function ($routeProvider) {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

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
