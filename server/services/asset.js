'use strict';

const path = require('path');
const faker = require('faker');
const randomNum = faker.random.number;
const filename = path.resolve(__dirname, '../models/mock/asset/asset.model.json');
// const assetList = require(filename);
const { writeJSONFile, getJSONFile } = require('../utils/fs');
const users = [
    { value: '001', text: '严跃杰' },
    { value: '002', text: '张晓容' },
    { value: '003', text: '赵雨森' },
    { value: '004', text: '张磊' },
];

module.exports = {
    getDetail(id) {
        return new Promise((resolve, reject) => {
            const assetList = getJSONFile(filename);
            const detail = assetList.find((item) => item.id === id);
            setTimeout(() => {
                if (!detail) {
                    resolve({
                        message: '没有该资产',
                        code: 404,
                    });
                }
                const user = users.find((tempUser) => tempUser.value === detail.userId);
                if (user)
                    detail.user = user.text;
                else
                    detail.user = detail.user || '';
                resolve(detail);
            }, randomNum(500));
        });
    },
    getList(options) {
        const assetList = getJSONFile(filename);
        const offset = options.offset || 0;
        const limit = options.limit !== undefined ? options.limit : assetList.length;
        const searchKey = ['assetNumber', 'type', 'model', 'status', 'userId'];

        return new Promise((resolve, reject) => {
            let arrangedData = Array.from(assetList);
            searchKey.forEach((key) => {
                if (options[key])
                    arrangedData = arrangedData.filter((item) => item[key] && item[key].startsWith(options[key]));
            });
            arrangedData = arrangedData.map((item) => {
                const user = users.find((tempUser) => tempUser.value === item.userId);
                if (user)
                    item.user = user.text;
                else
                    item.user = item.user || '';
                return item;
            });
            setTimeout(() => resolve({
                data: arrangedData.slice(offset, offset + limit),
                total: arrangedData.length,
            }, randomNum(500)));
        });
    },
    create(asset) {
        Object.assign(asset, {
            id: faker.random.uuid(),
            createAt: new Date().getTime(),
            updateAt: new Date().getTime(),
            status: 'receiving',
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
            const detail = assetList.find((item) => item.id === asset.id);
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
    delete(id) {
        const assetList = getJSONFile(filename);
        const assetListTemp = assetList.filter((asset) => asset.id !== id);
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
                if (!map[item.type]) {
                    map[item.type] = 0;
                }
                map[item.type] = ++map[item.type];
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
                if (!map[item.createAt]) {
                    map[item.createAt] = {};
                    types.forEach((key) => map[item.createAt][key] = 0);
                }
                map[item.createAt][item.type] = ++map[item.createAt][item.type];
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
    getStatus() {
        const status = [
            { value: 'unattended', text: '未归属' },
            { value: 'belonged', text: '已归属' },
            { value: 'receiving', text: '接受中' },
            { value: 'transferring', text: '转移中' },
        ];
        return new Promise((resolve) => {
            setTimeout(() => resolve(status), randomNum(500));
        });
    },
    getUsers() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(users), randomNum(500));
        });
    },
};
