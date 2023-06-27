const dtoError = (status, message, err) => {
    const error = {
        status: status,
        message: message,
        err: err,
    }
<<<<<<< HEAD
    // const jsonData = JSON.stringify(error);
=======
>>>>>>> d13d4f60c93238b864a6119dc94ffe93c629b9c5

    return error;
}

exports.dtoError = dtoError;