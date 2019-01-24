const proxy = require('http-proxy-middleware')
const port = 3002

module.exports = function(app) {
    app.use(proxy('/api', { target: `http://localhost:${port}/` }))
}