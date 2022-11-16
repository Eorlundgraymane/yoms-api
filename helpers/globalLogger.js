const debugMode = true || process.env.DEBUGMODE == "DEBUG";
const infoMode = false || process.env.DEBUGMODE == "INFO";

exports.errorLog = (message = "No Message Defined", errorStack = {}, infoObject = {}) => {
    try {
      console.log(message);
    debugMode ? console.log(errorStack) : {};
    infoMode ? console.log(infoObject) : {};
    return message;  
    }
    catch (ex) {
        return ex;
    }

}