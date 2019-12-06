"use strict";
const HttpServer = require("./httpServer");
const WsServer = require("./wsServer");

console.log("________________________________________________")

var global = {};
global.http = new HttpServer(global);
global.websocket = new WsServer(global);

//start
global.http.start();

console.log("app started");