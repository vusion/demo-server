module.exports = {
    type: 'app',
    // host: '127.0.0.1',
    port: 80,
    root: __dirname,
    base: '/',
    srcPath: './server',
    entry: './server/app',
    routesPath: './server/routes.js',
    controllersPath: './server/controllers',
    middlewares: ['requestLogger', 'IPLimit'],
};
