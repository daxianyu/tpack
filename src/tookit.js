const path = require('path')
const fs = require('fs')

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
function hasProp(obj, prop) {
    return obj.hasOwnProperty(prop);
}

function mixin (target, source, force, deep) {
    "use strict";
    if (!source) return;
    if (!isObject(target)) return;
    for(let item in source) {
        if (!hasProp(target, item)) {
            if(isObject(source[item]) && deep) {
                target[item] = force ? {}: source[item];
                mixin(target[item], source[item], force, deep);
                continue;
            }
        } else if(target[item] && force){
            if(isObject(source[item]) && deep){
                mixin(target[item], source[item], force, deep);
                continue;
            }
        } else {
            if(!force) continue;
        }
        target[item] = source[item];
    }
}

function mkDir(dirPath){
    const pathList = dirPath.split('/')

    try{
        pathList.reduce((p, n)=>{
            const temPath = p + '/' + n
            if(!fs.existsSync(temPath)){
                fs.mkdirSync(temPath)
            }
            return temPath
        })
    } catch (e){
        console.log(e)
    }
}


function writeFile(to, data){
    const pathParser = path.parse(to),
        dir = pathParser.dir

    if(to[to.length - 1] === '/'){
        console.warn('不能将数据写入文件夹！')
        return
    }

    if(!fs.existsSync(dir)) mkDir(dir)
    fs.writeFileSync(to, data)
}

function copyFile(from, to) {
    const pathParser = path.parse(to),
        dir = pathParser.dir

    if(to[to.length - 1] === '/'){
        console.warn('不能将数据写入文件夹！')
        return
    }

    if(!fs.existsSync(dir)) mkDir(dir)
    fs.createReadStream(from).pipe(fs.createWriteStream(to))
}

function isOutLink(src) {
    if(src[0] ==='/' && src[1] === '/'){
        return true
    }
    if(src.indexOf('://') > -1){
        return true
    }
}

module.exports.writeFile = writeFile
module.exports.isOutLink = isOutLink
module.exports.copyFile = copyFile
module.exports.mixin = mixin