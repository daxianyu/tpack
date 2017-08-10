const tPack = require('./src/resource_html')
const find = require('./src/findEntry').find


let options = {
    context: '.',
    // entry: find('test/src/**/*.html', {
    //     // ignore: './src/pages/home/'
    // }),
    entry: {
        html1: 'test/src/index.html'
    },
    output: {
        path: 'dist',
        publicAssets: 'dist/statics/',
        script: 'dist/statics/script',
        link: 'dist/statics/css',
        img: 'dist/statics/images'
    },
    modify: {
        random: '__random',
        raw: '__raw'
    },
    defer: {
        all: true,
        ifSign: '__def',
        ifNotSign: '__nodef'
    },
    plain: true
}

a = tPack(options, ()=>{console.log('OK')})
