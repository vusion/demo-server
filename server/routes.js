module.exports = [
    // '/ => home#index',
    { path: '/api', directory: 'api', children: [
        { path: 'user', controller: 'user', children: [
            '=> #getList',
            { path: 'check', method: 'get', action: 'checkUser' },
            { path: 'register', method: 'post', action: 'registerUser' },
        // 补充作业中的路径
        ] },
        { path: 'ncv', controller: 'ncv', children: [
            '=> #getVolumes',
            // 'get :id => #getOne',
            // 'post :id => #addOne',
            // 'put :id => #updateOne',
            // 'snapshot => getSnapshot',
        ] },
        { path: 'login', controller: 'login', children: [
            '=> #checkLogin',
        ] },
        { path: 'overview', controller: 'overview', children: [
            'getSource => #getSource',
            'getIncome => #getIncome',
            'getVisit => #getVisit',
            'getFailInfo => #getFailInfo',
            'getStatic => #getStatic',
        ] },
        { path: 'ingress', controller: 'ingress', children: [
            'get getDetail => #getDetail',
            'get getList => #getList',
            'post createIngress => #createIngress',
            'put updateIngress => #updateIngress',
            'delete deleteIngress => #deleteIngress',
        ] },
        { path: 'vpc', controller: 'vpc', children: [
            'getVpcs => #getVpcs',
            'getSubnets => #getSubnets',
            'getSecurityGroups => #getSecurityGroups',
        ] },
        { path: 'uploader', controller: 'uploader', children: [
            'post upload => #upload',
        ] },
        { path: 'asset', controller: 'asset', children: [
            'get getDetail => #getDetail',
            'get getList => #getList',
            'post getList => #getList',
            'get getTypes => #getTypes',
            'post create => #create',
            'put update => #update',
            'put updateUser => #updateUser',
            'put updateStatus => #updateStatus',
            'delete delete => #delete',
            'get getDepartmentStatistics => #getDepartmentStatistics',
            'get getTypeStatistics => #getTypeStatistics',
            'get getCreateStatistics => #getCreateStatistics',
        ] },
    ] },
];
