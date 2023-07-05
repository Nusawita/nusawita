module.exports = {
    //operation method
    get: {
        tags: ["Authorization"], //operation's tags
        description: "Log out user from website", // short description
        parameters: [
            {
                name: 'Cookie',
                in: 'header',
                required: true,
                schema: {
                  type: 'string',
                },
                description: 'Cookie header',
            },
        ], // expected params
        responses: {
            // response code
            200: {
                description: "User success log out", // response description
                headers: {
                    "Set-Cookie": {
                        schema: {
                            type: "string",
                            example: {
                                session_token: "",
                                domain: "localhost",
                                path: "/",
                                HttpOnly: false
                            },
                        },
                        description: "delete token",
                    },
                },
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        examples: {
                            success: {
                                description: "example of success logout",
                                value: {
                                    message: "Log out success",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};