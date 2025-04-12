import jwt from 'jsonwebtoken'

const userAuth = async(req, res, next) => {
    try {
        const { token } = req.headers;
        console.log('Auth middleware: Received token:', token ? 'Yes' : 'No');

        if (!token) {
            console.error('Auth middleware: No token provided');
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please login.'
            });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Auth middleware: Token verified:', tokenDecode ? 'Yes' : 'No');

        if (!tokenDecode || !tokenDecode.id) {
            console.error('Auth middleware: Invalid token payload');
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token. Please login again.'
            });
        }

        req.user = { id: tokenDecode.id };
        console.log('Auth middleware: User authenticated with ID:', tokenDecode.id);
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format. Please login again.'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Authentication error. Please try again.'
        });
    }
};

export default userAuth;