const validateSchema = (schema, dataFrom = null) => {
    function trimObject(obj) {
        Object.entries(obj).forEach((data) => {
            if (typeof data[1] == "string") {
                obj[data[0]] = data[1].trim();
            }
        });
    }

    return async (req, res, next) => {
        let data;
        if (
            req.method.toLowerCase() == "post" ||
            req.method.toLowerCase() == "put" ||
            req.method.toLowerCase() == "patch"
        ) {
            data = req.body;
        } else if (
            req.method.toLowerCase() == "get" ||
            req.method.toLowerCase() == "delete"
        ) {
            data = req.query;
        }

        if (dataFrom != null) {
            data = req[dataFrom];
        }
        console.log("Req body here : ", "data");

        if (data != undefined && schema != undefined) {
            trimObject(data);

            try {
                await schema.validateAsync(data);
                next();
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: err.details[0].message.replace(/\"/g, ""),
                    data: {},
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "Invalid Schema",
                data: {},
            });
        }
    };
};

export default validateSchema;
