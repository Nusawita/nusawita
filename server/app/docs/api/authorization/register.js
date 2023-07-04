module.exports = {
    //operation method
    post: {
        tags: ["Authorization"], //operation's tags
        description: "Register new user info to database", // short description
        parameters: [], // expected params
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Register", // register input data model
                    },
                },
            },
        },
        responses: {
            // response code
            201: {
                description: "registration success", // response description
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
                                description: "example of success register",
                                value: {
                                    message: "User created",
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
                                status: {
                                    type: "integer"
                                },
                                message: {
                                    type: "object",
                                },
                            },
                        },
                        examples: {
                            failed: {
                                description: "failed register register",
                                value: {
                                    status: 401,
                                    message: {
                                        username: "Username has already been taken",
                                        email: "Email has already been taken",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            // response code
            500: {
                description: "Internal server error", // response description
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "integer"
                                },
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        examples: {
                            failed: {
                                description: "failed register register",
                                value: {
                                    status: 500,
                                    message: "Internal server error",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};