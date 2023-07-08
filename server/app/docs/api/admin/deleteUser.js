module.exports = {
    //operation method
    delete: {
        security: [
            {
                cookieAuth: [],
            }
        ],
        tags: ["Admin"], //operation's tags
        description: "delete user from database by id", // short description
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                shcema: {
                    type: 'string',
                },
                description: 'ID of user'
            }
        ], // expected params
        responses: {
            // response code
            200: {
                description: "delete user success", // response description
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
                                description: "success delete user",
                                value: {
                                    message: "User deleted",
                                },
                            },
                        },
                    },
                },
            },
            // response code
            401: {
                description: "Unauthorized user", // response description
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
                            failed: {
                                description: "Unauthorized User or user not admin",
                                value: {
                                    message: "Unauthorized User",
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
                                message: {
                                    type: "string",
                                },
                            },
                        },
                        examples: {
                            failed: {
                                description: "Internal server error",
                                value: {
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