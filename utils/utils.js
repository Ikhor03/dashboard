export const errorMessage = (res, message, status) => {
    return res.status(status).json({ 
        error : 1,
        status,
        message
     });
}