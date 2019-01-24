const proxy = require('http-proxy-middleware')

console.log(`wowowow == http://localhost:${port}`)

module.exports = function(app) {
    app.use(proxy('/api', { target: `http://localhost:3010` }))
}