const dtoLogin = (user) => {
    const login = {
        id: user.id,
        username: user.username,
        email: user.email,
        noTelp: user.noTelp,
        dob: user.dob,
        ban: user.ban
    }

    return login;
}

exports.dtoLogin = dtoLogin;