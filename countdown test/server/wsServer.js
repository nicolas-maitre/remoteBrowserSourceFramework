const websocket = require('websocket');
//WEBSOCKET SERVER
module.exports = function(global){
    var _this = this;
    this.sendMessage = function(action, data){
        console.log("sendMessage", {action}, data);
    };
    this.start = function(){
        //websocket server
        console.log(global.http.server);
        var wsServer = new websocket.server({
            httpServer: global.http.server
        });

        //event
        wsServer.on('request', function(req){
            console.log("onrequest");
            var connection = req.accept(null, req.origin);
            wsmanager.initiateConnection(connection);
            //messages
            connection.on('message', function(msg){
                console.log("onmessage");
                if(msg.type != 'utf8'){
                    return;
                }
                //process message
                wsmanager.onMessage(msg.utf8Data);
            });
            
            //close
            connection.on('close', function(connection){
                
            });
        });

        wsServer.on('upgrade', function(req, res){
            if (req.headers['upgrade'] !== 'websocket') {
                console.log("bad request");
                socket.end('HTTP/1.1 400 Bad Request');
                return;
            }
            console.log("onupgrade");
        });
    }
}