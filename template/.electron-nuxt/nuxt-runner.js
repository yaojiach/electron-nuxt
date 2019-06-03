const { Nuxt, Builder, Generator } = require('nuxt')
let config = require('./nuxt.config.js');


const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const generator = new Generator(nuxt, builder);


if(process.env.NODE_ENV !== 'production'){
    builder.build().then(() => {
        nuxt.listen(9080)
        process.send({status: 'ok'})
    }).catch(err => {
        process.send({status: 'error', err: err})
        process.exit(1)
    });
}else{
    generator.generate({build: true, init: true}).then(() => {
        process.send({status: 'ok'})
    }).catch(err => {
        process.send({status: 'error', err: err})
        process.exit(1)
    });
}





// process.on('message', ({action}) => {
//     console.log('get msg');
//     if(action === 'exit'){
//         console.log('msg exit');
//         server.close(() => {
//             console.log('Nuxt process exit ok');
//             process.exit();
//         })
//     }
// });