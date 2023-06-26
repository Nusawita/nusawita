const dtoError = (status, message, err) => {
    const error = {
        status: status,
        message: message,
        err: err,
    }
    const jsonData = JSON.stringify(error);

    return jsonData;
}

exports.dtoError = dtoError;