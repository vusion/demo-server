const ResponseCode = require('@s-shared/ResponseCode');
const userService = require('@s-services/user');

module.exports = {
    async getList(ctx) {
        // Validate ctx.query

        const query = ctx.request.fields;
        const result = await userService.getList({
            limit: query.limit === undefined ? query.limit : +query.limit,
            offset: query.offset === undefined ? query.offset : +query.offset,
            sortField: query.sortField,
            sortOrder: query.sortOrder,
            searchField: query.searchField,
            searchKeyword: query.searchKeyword,
        });

        ctx.body = {
            result,
            code: ResponseCode.success,
        };
    },
};
