module.exports = {
    //operation method
    post: {
        tags: ["Check"], //operation's tags
        description: "Check email if already exist", // short description
        parameters: [], // expected params
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/CheckEmail", // register input data model
                    },
                },
            },
        },
        responses: {
            // response code
            200: {
                description: "Email is unique", // response description
            },
            // response code
            401: {
                description: "Email has already been taken", // response description
            },
        },
    },
};