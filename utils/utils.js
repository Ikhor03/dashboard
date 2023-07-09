export const errorMessage = (res, error, status) => {
    return res.status(status).json({ 
        error : 1,
        status,
        message: error.message
     });
}