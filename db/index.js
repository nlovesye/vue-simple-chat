const config = require('../config/db')
const MongoClient = require('mongodb').MongoClient

/* Mongodb数据库类 */
class Db {
    /* 单例 */
    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance
    }
    /* 单例 */

    constructor() {
        this.dbClient = null
        this.connect()
    }

    /* 连接数据库 */
    async connect() {
        return await new Promise((resolve, reject) => {
            if (!this.dbClient) {
                // console.log(2)
                MongoClient.connect(config.dbUrl, (err, client) => {
                    if (err) {
                        console.log(`----数据库连接失败----`)
                        reject(err)
                    } else {
                        console.log(`----MongoDB数据库连接成功----数据库名称:[${config.dbName}]`)
                        this.dbClient = client.db(config.dbName)
                        resolve(this.dbClient)
                    }
                })
            } else {
                // console.log(2)
                resolve(this.dbClient)
            }
        })
    }
    /* 连接数据库 */

    /* 插入数据 */
    insert(cName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(cName).insertOne(json, (err, rt) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rt)
                    }

                })
            })
        })
    }
    /* 插入数据 */

    /* 查询数据 */
    find(cName, json, projection = {}) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let rt
                if (projection._limit) {
                    rt = db.collection(cName).find(json, projection).skip(projection._skip || 0).limit(projection._limit)
                } else {
                    rt = db.collection(cName).find(json, projection)
                }
                rt.toArray((err, docs) => {
                    if (err) {
                        console.log('查询出错----')
                        reject(err)
                    } else {
                        resolve(docs)
                    }
                })
            })
        })
    }
    /* 查询数据 */

    /* 查询一条数据 */
    findOne(cName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(async db => {
                try {
                    let rt = await db.collection(cName).findOne(json)
                    resolve(rt)
                } catch (error) {
                    reject(error)     
                }
            })
        })
    }
    /* 查询一条数据 */

    /* 更新数据 */
    updateOne(cName, targetJson, newJson) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(cName).updateOne(targetJson, {
                    $set: newJson
                }, (err, rt) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rt)
                    }
                })
            })
        })
    }
    /* 更新数据 */

    /* 删除数据 */
    remove(cName, targetJson) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(cName).removeOne(targetJson, (err, rt) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rt)
                    }

                })
            })
        })
    }
    /* 删除数据 */

}

module.exports = Db.getInstance()