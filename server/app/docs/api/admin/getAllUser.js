module.exports = {
    //operation method
    get: {
        security: [
            {
                cookieAuth: [],
            }
        ],
        tags: ["Admin"], //operation's tags
        description: "get all user info from database", // short description
        parameters: [
            {
                name: "search",
                in: "query",
                required: false,
                shcema: {
                    type: 'string',
                },
                description: 'to help with search feature'
            }
        ], // expected params
        responses: {
            // response code
            200: {
                description: "get all user success", // response description
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                message: {
                                    type: "string",
                                },
                                data: {
                                    type: "array",
                                    item: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "integer"
                                            },
                                            username: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string",
                                                format: "email"
                                            },
                                            noTelp: {
                                                type: "string"
                                            },
                                            dob: {
                                                type: "string",
                                                format: "date-time"
                                            },
                                            ban: {
                                                type: "integer",
                                            },
                                        },
                                    }
                                },
                            },
                        },
                        examples: {
                            success: {
                                description: "success get all user",
                                value: {
                                    message: "success get all user",
                                    data: [
                                        {
                                            id: 1,
                                            username: "fajartapa",
                                            email: "fajartapa@gmail.com",
                                            noTelp: "082123456789",
                                            dob: "2001-03-10T00:00:00.000Z",
                                            ban: null,
                                        },
                                        {
                                            id: 2,
                                            username: "tapamahendra",
                                            email: "tapamahendra@gmail.com",
                                            noTelp: "082123987654",
                                            dob: "2001-09-22T00:00:00.000Z",
                                            ban: null,
                                        },
                                    ],
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
                                data: {
                                    type: "array",
                                    item: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "integer"
                                            },
                                            username: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string",
                                                format: "email"
                                            },
                                            noTelp: {
                                                type: "string"
                                            },
                                            dob: {
                                                type: "string",
                                                format: "date-time"
                                            },
                                            ban: {
                                                type: "integer",
                                            },
                                        },
                                    }
                                },
                            },
                        },
                        examples: {
                            failed: {
                                description: "Unauthorized User or user not admin",
                                value: {
                                    message: "Unauthorized User",
                                    data: null,
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
                                data: {
                                    type: "array",
                                    item: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "integer"
                                            },
                                            username: {
                                                type: "string"
                                            },
                                            email: {
                                                type: "string",
                                                format: "email"
                                            },
                                            noTelp: {
                                                type: "string"
                                            },
                                            dob: {
                                                type: "string",
                                                format: "date-time"
                                            },
                                            ban: {
                                                type: "integer",
                                            },
                                        },
                                    }
                                },
                            },
                        },
                        examples: {
                            failed: {
                                description: "Internal server error",
                                value: {
                                    message: "Internal server error",
                                    data: null,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};