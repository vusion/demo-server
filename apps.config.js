// module.exports = {
//     apps: [{
//         name: 'app',
//         script: 'npm',
//         args: [
//             'start',
//             '--',
//             '--port',
//             '9103',
//         ],
//         error_file: 'logs/app/stderr.log',
//         out_file: 'logs/app/stdout.log',
//         pid_file: 'tmp/pids/app.pid',
//         merge_logs: true,
//         env: {
//             DEBUG_COLORS: 'true',
//             FORCE_COLOR: '1',
//             NODE_ENV: 'online',
//             NODE_CONFIG_DIR: './src/config',
//         },
//     }],
// };

/* eslint-disable camelcase */
module.exports = {
    apps: [{
        name: 'akos-server',
        script: 'npm',
        args: [
            'start',
        ],
        error_file: 'logs/app/stderr.log',
        out_file: 'logs/app/stdout.log',
        pid_file: 'tmp/pids/app.pid',
        merge_logs: true,
        env: {
            DEBUG_COLORS: 'true',
            FORCE_COLOR: '1',
        },
    }],
};
