module.exports = {
    //operation method
    put: {
        security: [
            {
                cookieAuth: [],
            }
        ],
        tags: ["Admin"], //operation's tags
        description: "ban user by admin", // short description
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
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Ban", // register input data model
                    },
                },
            },
        },
        responses: {
            // response code
            200: {
                description: "success ban user", // response description
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
                                description: "success ban user",
                                value: {
                                    message: "User banned",
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