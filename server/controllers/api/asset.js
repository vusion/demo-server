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
        const { Offset, Limit } = ctx.request.query;
        const options = {
            Offset,
            Limit,
            Filter: ctx.request.fields && ctx.request.fields.Filter || {},
        };
        response(ctx, await assetService.getList(options));
    },
    async getTypes(ctx) {
        response(ctx, await assetService.getTypes());
    },
    async create(ctx) {
        const { Model, AssetNumber, Memory, Cpu, Harddisk, Type, User, Department } = ctx.request.fields;
        const asset = {
            Model,
            AssetNumber,
            Memory,
            Cpu,
            Harddisk,
            Type,
            User,
            Department,
        };
        response(ctx, await assetService.create(asset));
    },
    async update(ctx) {
        const { Id, Model, AssetNumber, Memory, Cpu, Harddisk, Type, User, Department } = ctx.request.fields;
        const asset = {
            Id,
            Model,
            AssetNumber,
            Memory,
            Cpu,
            Harddisk,
            Type,
            User,
            Department,
        };
        response(ctx, await assetService.update(asset));
    },
    async delete(ctx) {
        response(ctx, await assetService.delete(ctx.request.fields.Id));
    },
    // 转移资产
    async updateUser(ctx) {
        const { Id, User } = ctx.request.fields;
        const asset = {
            Id,
            User,
        };
        response(ctx, await assetService.update(asset));
    },
    // 修改状态
    async updateStatus(ctx) {
        const { Id, Status } = ctx.request.fields;
        const asset = {
            Id,
            Status,
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
};
