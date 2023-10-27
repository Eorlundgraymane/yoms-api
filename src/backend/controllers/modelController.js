module.exports = {
    findByPk: async (Model, Pk, extended = false) => {
        try {
            let params = {};
            if (extended) {
                params.include = {};
                params.include.all = true;
            }
            let result = await Model.findByPk(Pk, params);
            if (result == null || result.length <= 0) {
                return (Model.name + ' not found');
            }
            else {
                return result;
            }
        }
        catch (err) {
            console.log(err);
            return new Error(err).stack;
        }

    },
    findAll: async (Model, params, extended = false) => {
        try {            
            if (extended) {
                params.include = {};
                params.include.all = true;
            }
            let result = await Model.findAll(params);
            if (result == null || result.length <= 0) {
                return (Model.name + ' not found');
            }
            else {
                return result;
            }
        }
        catch (err) {
            console.log(err);
            return new Error(err).stack;
        }

    },
    findOne: async (Model, params, extended = false) => {
        try {            
            console.log(extended);            
            if (extended) {
                params.include = {};
                params.include.all = true;
            }
            console.log("HIT");
            console.log(params);
            let result = await Model.findOne(params);
            //console.log(result);
            if (result == null || result.length <= 0) {
                return (Model.name + ' not found');
            }
            else {
                return result;
            }
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
            if (result == null || result.length <= 0) {
                return ("Failed to create " + Model.name);
            }
            else {
                return result;
            }
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
            if (result == null || result.length <= 0) {
                return ("Failed to delete " + Model.name);
            }
            else {
                return result;
            }
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
            if (result == null || result.length <= 0) {
                return ("Failed to delete " + Model.name);
            }
            else {
                return result;
            }
        }
        catch (err) {
            console.log(err);
            return new Error(err).stack;
        }
    }
}