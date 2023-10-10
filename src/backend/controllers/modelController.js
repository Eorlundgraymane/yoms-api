module.exports = {
    fetch : {
        byID : async (Model,Pk,success,error) => {
            try{
                console.log(Model);
                let result = await Model.findByPk(Pk);
                if(result == null || result.length <= 0){
                    error(Model.name +' not found');
                }
                else{
                    success(result);
                }
            }
            catch(err){
                error(err);
            }
            
        },
        byParams : async (Model,params,success,error) => {
            try{      
                let result = await Model.findOne(params);
                if(result == null || result.length <= 0){
                    error(Model.name +' not found');
                }
                else{
                    success(result);
                }
            }
            catch(err){                
                error(err);
            }
            
        },
    },
    create: {
        byParams: async (Model,params, success, error) => {

            let result = {};
            console.log(params);
            try {
                result = await Model.create(params);
                if (result == null || result.length <= 0) {
                    error("Failed to create "+ Model.name);
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