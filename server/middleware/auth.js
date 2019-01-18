const { User } = require('../models/user')

let auth = (req,res,next) => {
    let token = req.cookies.CRA

    User.findByToken(token, (err, user)=> {
        if(err) throw err
        
        if (!user) return res.json({
            message: 'User not logged in',
            isAuth: false,
            error: true
        })

        req.token = token
        req.user = user

        if (req.body.value) {
            req.body.userInfo = user._id
        }

        next()
    })
}

module.exports = { auth }