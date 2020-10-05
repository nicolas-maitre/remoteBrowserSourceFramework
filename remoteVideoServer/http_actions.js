const fs = require("fs");
const mime = require("mime");
const BASE_PATH = "/git/personal/remoteBrowserSourceFramework/remoteVideoClient";
var httpActions = {
    async getFileFromUrl(urlObj){
        var systemPath = BASE_PATH;
        switch(urlObj.pathname){
            case "/browserSource/": 
                systemPath += "/browserSource.html";
                break;
            case "/":
                systemPath += "/emitter.html";
                break;
            default:
                systemPath += urlObj.pathname;
                break;
        }
        if(!fs.existsSync(systemPath)){
            return false;
        }
        return {
            mimeType: mime.getType(systemPath),
            data: fs.readFileSync(systemPath)
        };
    }
};
module.exports = httpActions;