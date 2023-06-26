const dtoLogin = (user) => {
    const login = {
        id: user.id,
        username: user.username,
        email: user.email,
        no_telp: user.no_telp,
        dob: user.dob,
        isAdmin: user.isAdmin,
        ban: user.ban
    }

    return login;
}

exports.dtoLogin = dtoLogin;