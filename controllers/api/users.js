const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

async function create(req, res) {
    // just for right now I want to see if this is connected 
        try{
            const user = await User.create(req.body)

            const token = createJWT(user)

            res.json(token)


        } catch(error){
            res.status(400).json(error)
        }
    }

    async function logIn(req, res) {
        try{
            // get the user that's trying to log in
            const user = await User.findOne({ email: req.body.email})
            if (!user) throw new Error()
            // check if the password is valid
            const passwordsMatch = bcrypt.compare(req.body.password, 
                user.password)
            if (passwordsMatch) {
                res.json(createJWT(user))
            } else {
                throw new Error()
            }

        }catch{
            res.status(400).json('Bad Credentials')

        }
    }
    
    function checkToken(req, res){
        console.log('req.user', req.user)
        res.json(req.exp)
    }

    module.exports = {
        create,
        logIn,
        checkToken,
    }



// function create(req, res, next) {
// // just for right now I want to see if this is connected
//     res.json({
//         user: {
//             name: req.body.name,
//             email: req.body.email
//         }
//     })
// }

// module.exports = {
//     create
// }