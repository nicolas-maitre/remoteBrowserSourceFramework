const httpActions = require("./http_actions.js");

const http = require('http');
const websocket = require('websocket');
const url = require('url');
const HTTP_PORT = 80;

//http server
var httpServer = http.createServer(onHttpRequest);
httpServer.listen(HTTP_PORT);
async function onHttpRequest(req, res){
    var urlObj = url.parse(req.url);
    if(urlObj.pathname == "/websocket"){
        return;
    }
    var fileRes = await httpActions.getFileFromUrl(urlObj);
    console.log(fileRes);
    if(fileRes){
        res.setHeader("Content-Type", fileRes.mimeType);
        res.end(fileRes.data);
        return;
    }
    res.statusCode = 404;
    res.end(`file not found`);
}

// websocket server
var wsServer = new websocket.server({httpServer});
wsServer