module.exports = {
    //operation method
    post: {
        tags: ["Authorization"], //operation's tags
        description: "Login user to website", // short description
        parameters: [], // expected params
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Login", // register input data model
                    },
                },
            },
        },
        responses: {
            // response code
            200: {
                description: "User success login", // response description
                headers: {
                    "Set-Cookie": {
                        schema: {
                            type: "string",
                            example: {
                                session_token: "eyJhbXVCJ9.eyJpZCc1NjB9.kMY6kwGc",
                                domain: "localhost",
                                path: "/",
                                HttpOnly: false
                            },
                        },
                        description: "cookies for authentication",
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
                                data: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                        },
                                        isAdmin: {
                                            type: "boolean",
                                        },
                                    },
                                },
                            },
                        },
                        examples: {
                            success: {
                                description: "example of success register",
                                value: {
                                    message: "User Log in",
                                    data: {
                                        username: "fajartapa",
                                        isAdmin: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            // response code
            401: {
                description: "Unauthorized", // response description
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                                data: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                        },
                                        isAdmin: {
                                            type: "boolean",
                                        },
                                    },
                                },
                            },
                        },
                        examples: {
                            success: {
                                description: "example of failed login",
                                value: {
                                    message: "Username or Password are invalid",
                                    data: null
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};