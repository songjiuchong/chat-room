const http = require('http');
const server = http.createServer();
// var ws = require('node-websocket-server');
// var WebSocket = require('nodejs-websocket');
const WebSocket = require('ws');

var clientui = require('fs').readFileSync('client.html');
var conns = new Array();
var idBank = new Array();

const wss = new WebSocket.Server({ server });

server.on('request',function(request,response){
	var url = require('url').parse(request.url);
	//将聊天室客户端页面html发送给客户端;
	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'}); //注意, 如果这里不添加charset=utf-8响应, 页面会显示中文乱码;
	response.write(clientui);
	response.end();
});

wss.on('connection', function (conn) {
	var flag = false;
	var total = 1;
	var id = '';
    conn.on("message", function (msg) {
        if(!flag){
			id = msg.slice(0,msg.indexOf(' '));
			for(var i=0; i<idBank.length; i++){
				if(id == idBank[i]){
					conn.send('1234554321132435das9asdj9aj09fajs0jiw09jfja7y83h'); //设置错误码,为了避免和用户聊天信息发生冲突需要设置繁琐的代号;
					return;
				}
			}
			conn.send('198904251511fj83ja9fj84jf74hu72f9wfuhw72if91hjf1'); //设置成功码;
			conns.push(conn);
			idBank.push(id);
			console.log(id + ' connected');
			console.log('当前用户总数: '+ idBank.length + '\n');
			var message = {type:'sys',msg:'' + id + ' 加入了聊天室.',online:idBank.length};
			message = JSON.stringify(message);
			for(var i=0; i<conns.length; i++){
				if(conns[i] && conns[i] != conn){
					conns[i].send(message);
				}else if(conns[i] == conn){
					conns[i].send('{"type":"sys2","online":' + idBank.length + '}');
				}
			}
			flag = true;
		}else{
			console.log(id+' 发言次数: ' + total++);
			originMsg = msg.replace(/\n/ig,'<br/>');

			for(var i=0; i<conns.length; i++){
				if(conns[i]){
					msg = originMsg; //每次循环先将待发出的发言重置为初始收到的黑色字体的发言;
					if(conns[i] == conn){
						msg = msg.replace(/black/,'#f6ef67'); //自己的发言将显示其它颜色的文本,以便区分;	
					}

					var message = {type:'chat',msg:msg};
					message = JSON.stringify(message);
					conns[i].send(message);
				}
			}
		}
    })
    conn.on("close", function () {
        if(flag){ //如果没有id错误则执行以下代码;
			console.log(id + ' disconnected \n');
			var order = conns.indexOf(conn);
			conns.splice(order,1); //代替了原先使用的delete conns[order];语句， 因为使用delete会在数组被删除元素位置留下一个undefined元素;
			var idOrder = idBank.indexOf(id); //将id从id库中删除,可以再次被使用;
			idBank.splice(idOrder,1);
			console.log('当前用户总数: '+ idBank.length + '\n');
			var message = {type:'sys',msg:'' + id + ' 离开了聊天室.',online:idBank.length};
			message = JSON.stringify(message);
			for(var i=0; i<conns.length; i++){
				if(conns[i]){
					conns[i].send(message);
				}
			}	
		}
    })
    conn.on("error", function(e){
 		conn.close(); 
	});
});

// 监听端口，启动程序
const port = process.env.PORT || 8080
server.listen(port, function () {
    console.log(`server started... listening on port ${port}`)
})


//浏览器请求服务器8000端口获取聊天室客户端HTML代码;
// var http = require('http');
// var clientui = require('fs').readFileSync('client.html');
// var indexServer = new http.Server();

// indexServer.on('request',function(request,response){
// 	var url = require('url').parse(request.url);
// 	if(url.pathname === '/chat'){
// 		//将聊天室客户端页面html发送给客户端;
// 		response.writeHead(200,{'Content-Type':'text/html;charset=utf-8;'}); //注意, 如果这里不添加charset=utf-8响应, 页面会显示中文乱码;
// 		response.write(clientui);
// 		response.end();
// 	}else{
// 		response.writeHead(404);
// 		response.end();
// 	}
// });
// indexServer.listen(8000);
// console.log('indexServer started');