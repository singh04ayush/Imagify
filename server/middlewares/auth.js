import jwt from 'jsonwebtoken'

const userAuth = async(req, res, next) => {
    try {
        const { token } = req.headers;

        // Only log in non-production environments
        if (process.env.NODE_ENV !== 'production') {
            console.log('Auth middleware: Token received:', !!token);
        }

        if (!token) {
            console.error('Auth middleware: No token provided');
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please login.'
            });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Only log in non-production environments
        if (process.env.NODE_ENV !== 'production') {
            console.log('Auth middleware: Token verified:', !!tokenDecode);
        }

        if (!tokenDecode || !tokenDecode.id) {
            console.error('Auth middleware: Invalid token payload');
            return res.status(401).json({
                success: false,
                message: 'Invalid authentication token. Please login again.'
            });
        }

        req.user = { id: tokenDecode.id };

        // Only log in non-production environments
        if (process.env.NODE_ENV !== 'production') {
            console.log('Auth middleware: User authenticated with ID:', tokenDecode.id);
        }

        next();

    } catch (error) {
        // Error logging is still important in production, but we'll sanitize the output
        console.error('Auth middleware error:', error.name);
        
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