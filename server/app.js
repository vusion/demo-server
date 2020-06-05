/**
 * 应用程序入口
 */

require('module-alias/register');
// 将.env中配置到环境变量
require('../config');

const path = require('path');
const Koa = require('koa');
const AkosRouter = require('akos-router');

const loadMw = require('@/plugin/loadMiddlewares');
const views = require('koa-views');
const handleCustomCode = require('@/plugin/handleCustomCode');
const config = require('config');
const logger = require('@/utils/logger');
const log = logger.createLogger('app');
const cors = require('@koa/cors');

// middlewares
const body = require('koa-better-body');
const validate = require('koa-validate');
const convert = require('koa-convert'); // 兼容koa1

global.Promise = require('bluebird');

module.exports = (options) => {
    const app = new Koa();
    // 兼容koa
    const _use = app.use;
    app.use = (x) => _use.call(app, convert(x));
    // 应用配置
    app.name = config.name;
    app.keys = config.keys;
    app.proxy = true;

    // 请求正文解析
    app.use(body({
        multipart: true,
        keepExtensions: true,
        strict: false,
    }));
    // 插件: 加载自定义中间件 在文件akos.config.js中,配置middlewares
    loadMw(app, options);
    // 插件: 请求返回改造
    handleCustomCode(app);

    // app.use(async (ctx, next) => {
    //     ctx.set('Access-Control-Allow-Origin', 'http://localhost:12800');
    //     ctx.set('Access-Control-Allow-Credentials', 'true');
    //     ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //     ctx.set('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

    //     if (ctx.method === 'OPTIONS')
    //         ctx.body = 200;
    //     else
    //         await next();
    // });
    app.use(cors({
        credentials: true,
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        allowHeaders: 'X-Requested-With,content-type,Authorization',
    }));

    // 视图引擎
    log.info('加载ejs模板,路径=>' + path.resolve(__dirname, '../client/pages'));
    app.use(views(path.resolve(__dirname, '../client/pages'), {
        extension: 'ejs',
    }));
    // 参数验证
    validate(app);

    // 路由
    const router = new AkosRouter(require(options.routesPath), options);
    app.use(router.middleware());

    return app;
};
