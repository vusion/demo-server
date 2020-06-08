'use strict';

const path = require('path');
const faker = require('faker');
const randomNum = faker.random.number;
const filename = path.resolve(__dirname, '../models/mock/asset/asset.model.json');
// const assetList = require(filename);
const { writeJSONFile, getJSONFile } = require('../utils/fs');

module.exports = {
    getDetail(Id) {
        return new Promise((resolve, reject) => {
            const assetList = getJSONFile(filename);
            const detail = assetList.find((item) => item.Id === Id);
            setTimeout(() => {
                if (!detail) {
                    reject({
                        message: '没有该资产',
                        code: 404,
                    });
                }
                resolve(detail);
            }, randomNum(500));
        });
    },
    getList(options) {
        const assetList = getJSONFile(filename);
        const offset = options.Offset || 0;
        const limit = options.Limit !== undefined ? options.Limit : assetList.length;

        return new Promise((resolve, reject) => {
            let arrangedData = Array.from(assetList);
            if (options.Filter) {
                Object.keys(options.Filter).forEach((key) => {
                    arrangedData = arrangedData.filter((item) => item[key] && item[key].startsWith(options.Filter[key]));
                });
            }
            setTimeout(() => resolve({
                data: arrangedData.slice(offset, offset + limit),
                total: arrangedData.length,
            }, randomNum(500)));
        });
    },
    create(asset) {
        Object.assign(asset, {
            Id: faker.random.uuid(),
            CreateAt: new Date().getTime(),
            UpdateAt: new Date().getTime(),
            Status: '接收中',
        });
        const assetList = getJSONFile(filename);
        assetList.push(asset);
        writeJSONFile(filename, assetList).then(() => new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    message: 'success',
                    code: 200,
                });
            }, randomNum(500));
        }));
    },
    update(asset) {
        return new Promise((resolve, reject) => {
            const assetList = getJSONFile(filename);
            const detail = assetList.find((item) => item.Id === asset.Id);
            setTimeout(() => {
                if (!detail) {
                    reject({
                        message: '没有该资产',
                        code: 404,
                    });
                }

                Object.assign(detail, asset);

                writeJSONFile(filename, assetList).then(() => new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            message: 'success',
                            code: 200,
                        });
                    }, randomNum(500));
                }));

                resolve(detail);
            }, randomNum(500));
        });
    },
    delete(Id) {
        const assetList = getJSONFile(filename);
        const assetListTemp = assetList.filter((asset) => asset.Id !== Id);
        writeJSONFile(filename, assetListTemp).then(() => new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    message: 'success',
                    code: 200,
                });
            }, randomNum(500));
        }));
    },
    getTypes() {
        const types = ['台式机', '笔记本', '手机', '平板电脑'];
        return new Promise((resolve) => {
            setTimeout(() => resolve(types), randomNum(500));
        });
    },
    getDepartmentStatistics() {
        const sourceData = [
            { percent: 10, name: '人力资源部' },
            { percent: 20, name: '测试部' },
            { percent: 35, name: '研发部' },
            { percent: 35, name: '运维部' },
        ];
        return new Promise((resolve, reject) => resolve(sourceData));
    },
    getTypeStatistics() {
        const assetList = getJSONFile(filename) || [];
        return new Promise((resolve, reject) => {
            if (!assetList.length)
                return resolve({});
            const map = {};
            assetList.forEach((item) => {
                if (!map[item.Type]) {
                    map[item.Type] = 0;
                }
                map[item.Type] = ++map[item.Type];
            });
            const result = [];
            Object.keys(map).forEach((name) => {
                result.push({ total: map[name], name });
            });
            return resolve(result);
        });
    },
    getCreateStatistics() {
        const assetList = getJSONFile(filename) || [];
        const types = ['台式机', '笔记本', '手机', '平板电脑'];
        return new Promise((resolve, reject) => {
            if (!assetList.length)
                return resolve({});
            const map = {};
            assetList.forEach((item) => {
                if (!map[item.CreateAt]) {
                    map[item.CreateAt] = {};
                    types.forEach((key) => map[item.CreateAt][key] = 0);
                }
                map[item.CreateAt][item.Type] = ++map[item.CreateAt][item.Type];
            });
            const result = [];
            Object.keys(map).forEach((time) => {
                const temp = {
                    time,
                };
                types.forEach((key) => temp[key] = map[time][key]);
                result.push(temp);
            });
            return resolve(result);
        });
    },
};
