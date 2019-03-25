/**
 * HomeController
 * 默认控制器
 */

'use strict';

const HomeController = {
    // static *index(next) {
    //     yield this.render('index');
    //     yield next;
    // }

    // static *dashboard(next) {
    //     yield this.render('dashboard');
    //     yield next;
    // }

    // static *login(next) {
    //     yield this.render('login');
    //     yield next;
    // }
    checkLogin(ctx) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            code: 200,
            message: '',
            data: {
                login: true,
            },
        };
    },
};
module.exports = HomeController;
