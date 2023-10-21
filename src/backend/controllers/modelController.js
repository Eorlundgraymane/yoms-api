module.exports = {
    fetch: {
        findByPk: async (Model, Pk, extended, success, error) => {
            try {
                let options = {};                
                if (extended) {
                    let include = {};
                    include.all = true;
                    options.include = include;
                    console.log(options);        
                }             
                console.log(Pk);         
                let result = await Model.findByPk(Pk, options);
                if (result == null || result.length <= 0) {
                    error(Model.name + ' not found');
                }
                else {
                    success(result);
                }
            }
            catch (err) {
                error(err);
            }

        },
        findAll: async (Model, params, extended, success, error) => {
            try {
                let include = {};
                if (extended) {
                    include.all = true;
                    params.include = include;
                    console.log(include);        
                }                 
                console.log(params);
                let result = await Model.findAll(params);
                if (result == null || result.length <= 0) {
                    error(Model.name + ' not found');
                }
                else {
                    success(result);
                }
            }
            catch (err) {
                error(err);
            }

        },
        findOne: async (Model, params, extended, success, error) => {
            try {
                let include = {};
                if (extended) {
                    include.all = true;
                    params.include = include;
                    console.log(include);        
                }                                      
                console.log(params);        
                let result = await Model.findOne(params);
                if (result == null || result.length <= 0) {
                    error(Model.name + ' not found');
                }
                else {
                    success(result);
                }
            }
            catch (err) {
                error(err);
            }

        },
    },
    create: {
        byParams: async (Model, params, success, error) => {

            let result = {};
            try {
                result = await Model.create(params);
                if (result == null || result.length <= 0) {
                    error("Failed to create " + Model.name);
                }
                else {
                    success(result);
                }
            }
            catch (err) {
                console.log(err);
                error(err)
            }
        }
    }
}