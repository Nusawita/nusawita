const dtoError = (status, message, err) => {
    const error = {
        status: status,
        message: message,
    }
    return error;
}

exports.dtoError = dtoError;