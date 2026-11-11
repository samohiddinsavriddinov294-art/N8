import JWT from 'jsonwebtoken'
export const checkToken = (req, res, next) => {
    try {
        const {token} = req.headers

    if(!token){
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized token'
        })
    }

    const user = JWT.verify(token,process.env.JWT_SECRET)
    req.user = user

    next()
        
    } catch (error) {
        if(error.name == 'JsonWebTokenError'){
            res.status(400).json({
                status: 400,
                message: 'Error with token'
            })
        }
    }
} 