/**
 * Middleware - Authorization
 * 用户认证中间件
 */

'use strict';

module.exports = (options) => async function auth(ctx, next) {
    ctx.response.headers['Access-Control-Allow-Origin'] = '*';
    await next();
};
