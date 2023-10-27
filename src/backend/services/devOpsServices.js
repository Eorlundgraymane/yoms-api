const devOpsController = require('../controllers/devOpsController');
module.exports = {
    get: {
        dbReset: async () => {          
            try{
                let result = await devOpsController.DB.reset();
                return result;
            }            
            catch(err){
                return err;
            }
        },
    }
}