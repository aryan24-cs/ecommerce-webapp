module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err.statusCode = 400;
    }

    // Wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        message = 'JSON Web Token is invalid. Try Again!!!';
        err.statusCode = 400;
    }

    // JWT EXPIRED error
    if (err.name === 'TokenExpiredError') {
        message = 'JSON Web Token is expired. Try Again!!!';
        err.statusCode = 400;
    }

    res.status(err.statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
