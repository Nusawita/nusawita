module.exports = {
    //operation method
    post: {
        tags: ["Check"], //operation's tags
        description: "Check username if already exist", // short description
        parameters: [], // expected params
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/CheckUsername", // register input data model
                    },
                },
            },
        },
        responses: {
            // response code
            200: {
                description: "Username is unique", // response description
            },
            // response code
            401: {
                description: "Username has already been taken", // response description
            },
        },
    },
};