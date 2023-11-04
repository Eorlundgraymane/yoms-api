module.exports = {
    findByPk: async (Model, Pk, extended = false, nested = false) => {
        try {
            let params = {};
            if (extended) {
                params.include = {};
                params.include.all = true;
                if (nested) {
                    params.include.nested = true;
                }
            }
            let result = await Model.findByPk(Pk, params);
            return result;
        }
        catch (err) {
            console.log(err);
            return new Error(err).stack;
        }

    },
    findAll: async (Model, params, extended = false, nested = false) => {
        try {
            if (extended) {
                params.include = {};
                params.include.all = true;
                if (nested) {
                    params.include.nested = true;
                }
            }
            let result = await Model.findAll(params);
            return result;
        }
        catch (err) {
            console.log(err);
            return new Error(err).stack;
        }

    },
    findOne: async (Model, params, extended = false, nested = false) => {
        try {
            console.log(extended);
            if (extended) {
                params.include = {};
                params.include.all = true;
                if (nested) {
                    params.include.nested = true;
                }
            }
            console.log("HIT");
            console.log(params);
            let result = await Model.findOne(params);
            return result;
        }
        catch (exception) {
            //Dont ask why       
            console.log(exception);
            return new Error(exception).stack;
        }

    },
    create: async (Model, params) => {
        let result = {};
        try {
            result = await Model.create(params);
            return result;
        }
        catch (err) {
            console.log(err);
            return new Error(err).stack;
        }
    },
    update: async (Model, values, options) => {
        let result = {};
        try {
            result = Model.update(values, options);
            return result;
        }
        catch (err) {
            console.log(err);
            return new Error(err).stack;
        }
    },
    delete: async (Model, params) => {
        let result = {};
        try {
            result = Model.destroy(params);
            return result;
        }
        catch (err) {
            console.log(err);
            return new Error(err).stack;
        }
    }
}