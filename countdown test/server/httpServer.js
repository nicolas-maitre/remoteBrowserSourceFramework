//HTTP SERVER
const config = require("./config");
const httpLibrary = require("http");
module.exports = function(global){
    var _this = this;
    this.server = false;
    this.start = function(){
        //create listener
        _this.server = httpLibrary.createServer(onRequestStart);
        _this.server.listen(config.HTTP_PORT);
        console.log("http server started");
    };
    function onRequestStart(req, res){
		//method based on this article https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190
		//fixed with this: https://stackoverflow.com/a/45160600
		if (req.method === 'POST'){
			req.body = false;
			var bodyArrayBuffer = [];
			req.on('data', function(chunk){
				bodyArrayBuffer.push(chunk); //push buffer to arrayBuffer
			});
			req.on('end', function(evt){
				req.body = Buffer.concat(bodyArrayBuffer);
				onRequest(req, res);
			});
		} else {
			//if GET, no body
			onRequest(req, res);
		}
    }
    function onRequest(req, res){
        console.log("on request", req, res);
    }
}