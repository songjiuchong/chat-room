
Chat room;


Using Node.js to build a BS application with which multiple ppl can chat in a chat room.


memo:

(1)在服务器端使用了第三方插件'ws'来处理客户端的websocket请求, 客户端使用原生的new WebSocket(url)这样的方式来创建连接;

相比之前使用两个服务器来分别处理客户端的http和websocket请求, 这里通过一个服务器来同时监听这两种请求:

const http = require('http');
const server = http.createServer();
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

server.on('request',function(request,response){
......
wss.on('connection', function (conn) {
......
  conn.on("message", function (msg) {
  ......
  conn.on("close", function () {
  ......
  conn.on("error", function(e){
  ......

const port = process.env.PORT || 8080
server.listen(port, function () {
    console.log(`server started... listening on port ${port}`)
})

第三方插件'ws',参考:
https://github.com/websockets/ws


(2)由于heroku云服务器是https协议的, 所以需要在websocket通信时判断一下当前项目是在本地执行还是在线上执行:

        if(location.protocol && location.protocol.indexOf('https')==0){
          url = 'wss://' + location.host;
        }else{
          url = 'ws://' + location.host;
        }


(3)当某个用户通过关闭页面的方式直接离开了聊天室, 而不是通过点击'离开聊天室'按钮来离开时服务器端会在已连接的websocket对象上报一个错:
events.js:136
      throw er; // Unhandled 'error' event
Error: read ECONNRESET
    at _errnoException (util.js:1031:13)
    at TCP.onread (net.js:619:25)

解决办法是除了需要在已经连接的websocket对象上监听'close'事件(客户端在websocket连接对象上直接调用close()方法), 还需要监听一个'error'事件, 事件的处理函数的内容就是关闭当前发生错误的websocket对象的连接:

  conn.on("error", function(e){
    conn.close(); 
  });

这样当已连接用户通过关闭浏览器的方式退出聊天室时效果就与其点击'离开聊天室'按钮相同了;



