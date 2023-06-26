const dtoError = (status, message, err) => {
    const error = {
        status: status,
        message: message,
        err: err,
    }

    return error;
}

exports.dtoError = dtoError;