const path = require('path');

const Compiler = require('./compiler')

const allResource = {}

function defaultOptions(options){
    const deOption = {
        modify: {
            random: '__random',
            raw: '__raw'
        }
    }

    Object.keys(deOption.modify).forEach(mf=>{
        options[mf] = options[mf] || deOption.modify[mf]
    })

    return options
}

function tPack(options, callback){
    const compiler = new Compiler()
    compiler.options = defaultOptions(options)
    compiler.context = options.context? path.resolve(process.cwd(), options.context):process.cwd()

    let htmlFile = options.entry
    if(Object.prototype.toString.call(htmlFile) === '[object Object]'){
        compiler.multiEntry(Object.keys(htmlFile).map(htmlName=>compiler.entry(htmlName, htmlFile[htmlName])))
    } else {
        compiler.entry('index', htmlFile)
    }
    compiler.run(callback)
}

module.exports = tPack