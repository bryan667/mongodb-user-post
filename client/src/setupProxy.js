const proxy = require('http-proxy-middleware')
// const port = process.env.PORT || 3010

module.exports = function(app) {
    app.use(proxy('/api', { target: `https://evening-waters-88095.herokuapp.com:3010/` }))
}