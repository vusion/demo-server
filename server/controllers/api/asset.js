'use strict';

const assetService = require('@/services/asset.js');
const response = (ctx, data) => {
    ctx.response.type = 'application/json';
    ctx.response.body = {
        code: 200,
        message: '',
        data,
    };
};

module.exports = {
    async getDetail(ctx) {
        response(ctx, await assetService.getDetail(ctx.query.id));
    },
    async getList(ctx) {
        const { offset, limit } = ctx.request.query;
        const options = {
            offset,
            limit,
            filter: ctx.request.fields && ctx.request.fields.filter || {},
        };
        response(ctx, await assetService.getList(options));
    },
    async getTypes(ctx) {
        response(ctx, await assetService.getTypes());
    },
    async create(ctx) {
        const { model, assetNumber, memory, cpu, harddisk, type, user } = ctx.request.fields;
        const asset = {
            model,
            assetNumber,
            memory,
            cpu,
            harddisk,
            type,
            user,
        };
        response(ctx, await assetService.create(asset));
    },
    async update(ctx) {
        const { id, model, assetNumber, memory, cpu, harddisk, type, user } = ctx.request.fields;
        const asset = {
            id,
            model,
            assetNumber,
            memory,
            cpu,
            harddisk,
            type,
            user,
        };
        response(ctx, await assetService.update(asset));
    },
    async delete(ctx) {
        response(ctx, await assetService.delete(ctx.request.fields.id));
    },
    // 转移资产
    async updateUser(ctx) {
        const { id, user } = ctx.request.fields;
        const asset = {
            id,
            user,
        };
        response(ctx, await assetService.update(asset));
    },
    // 修改状态
    async updateStatus(ctx) {
        const { id, status } = ctx.request.fields;
        const asset = {
            id,
            status,
        };
        response(ctx, await assetService.update(asset));
    },
    async getDepartmentStatistics(ctx) {
        response(ctx, await assetService.getDepartmentStatistics());
    },
    async getTypeStatistics(ctx) {
        response(ctx, await assetService.getTypeStatistics());
    },
    async getCreateStatistics(ctx) {
        response(ctx, await assetService.getCreateStatistics());
    },
    async getStatus(ctx) {
        response(ctx, await assetService.getStatus());
    },
};
