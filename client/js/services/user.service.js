app.factory('User', ['$resource',
    function ($resource) {
        return $resource('api/users/:userId',
            {
                userId: '@_id',
                limit: '@_limit',
                page: '@_page',
                search: '@_search',
                sort: '@_sort',
                order: '@_order'
            },
            {
                update: {method: 'PUT'},
                delete: {method: 'DELETE'}
            });
    }
]);