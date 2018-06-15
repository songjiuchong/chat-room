# chat-room
Using Node.js to build a BS application with which multiple ppl can chat in a chat room.

Latest Update: <br/>
Since https://songjiuchongcrs2.herokuapp.com/chat has been **deprecated**, please refer to the final version in branch: 'live', and you can visit https://songjiuchongchatroom.herokuapp.com/ to use the latest updated app.
<br/><br/>

**Deprecated:**<br/>
In this branch(master), app is set to let visitors visit heroku cloud-hosted server(https://songjiuchongcrs2.herokuapp.com/chat) so they can enter the chatroom.

server1 is sync with https://git.heroku.com/songjiuchongcrs1.git <br/>
server2 is sync with https://git.heroku.com/songjiuchongcrs2.git <br/>

In order to let heroku deploy those two separate but synactic apps on its cloud-nested server: <br/>
https://songjiuchongcrs1.herokuapp.com <br/>
https://songjiuchongcrs2.herokuapp.com <br/>

To sum up, folders: server1 and server2 are two git repo that holding server files(one of them respond to visitor' browser a client-end .html file) for two apps. <br/>


NOTICE: <br/>
1.If you get an error message(failed: Establishing a tunnel via proxy server failed) when entering the chat room, please close any proxy you are using.<br/>
2.You can't look into server1/server2 folders in master branch since those two folders are holding their own git repos, so server1/server2 branches are provided for the sake of let you look inside those two server folders.


Rerference: <br/>
https://github.com/songjiuchong/memos/blob/master/Node.js%20note/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BANode.js.md
-- 19.基于WebSocket的简单聊天室;
