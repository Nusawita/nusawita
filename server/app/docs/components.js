module.exports = {
    components: {
        schemas: {
            //register model
            Register: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        minLength: 8,
                        required: true,
                        description: "Username of user",
                        example: "fajartapa"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        required: true,
                        description: "Email of user",
                        example: "fajartapa@gmail.co.id"
                    },
                    password: {
                        type: "string",
                        minLength: 8,
                        required: true,
                        description: "Password of user",
                        example: "fajar1234"
                    },
                    noTelp: {
                        type: "string",
                        required: false,
                        description: "Phone number of user",
                        example: "082123456789"
                    },
                    dob: {
                        type: "string",
                        format: "date-time",
                        required: true,
                        description: "Date of birth of user",
                        example: "2001-08-20"
                    },
                    isAdmin: {
                        type: "boolean",
                        required: true,
                        description: "User account type",
                        example: true
                    },
                    ban: {
                        type: "integer",
                        required: false,
                        description: "Store how long user will be banned if user gor banned",
                        example: 1688518215
                    },
                },
            },
            //login model 
            Login: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        minLength: 8,
                        required: true,
                        description: "User able to input username or email",
                        example: "fajartapa"
                    },
                    password: {
                        type: "string",
                        minLength: 8,
                        required: true,
                        description: "Password of user",
                        example: "fajar1234"
                    },
                },
            },
            //ban user model
            Ban: {
                type: "object",
                properties: {
                    ban: {
                        type: "integer",
                        description: "number of days user will be banned",
                        example: 5,
                    },
                },
            },
            //check username model
            CheckUsername: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        minLength: 8,
                        description: "username of user who want to register",
                        example: "fajar tapa",
                    },
                },
            },
            //check email model
            CheckEmail: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        format: "email",
                        description: "email of user who want to register",
                        example: "fajartapa@gmail.com",
                    },
                },
            },
            //error model
            Error: {
                type: "object",
                properties: {
                    status: {
                        type: "integer",
                        description: "Error status",
                        example: 500
                    }, 
                    message: {
                        type: "string",
                        description: "Message of an error",
                        example: "Internal Server Error"
                    }
                },
            },
        },
        securitySchemes: {
            cookieAuth: {
                type: "apiKey",
                in: "cookie",
                name: "session_token"
            },
        },
    },
}