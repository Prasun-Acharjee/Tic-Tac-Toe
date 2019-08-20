const express=require('express')
const http=require("http")
const socketIO=require('socket.io')
/*eslint-disable*/
//localhost port
const port=4001;
const app=express()
//server instance
const server=http.createServer(app)
//this creates our socket using the instance of the server
const io=socketIO(server)
//socket.io syntax

io.on('connection',socket=>{
    console.log('user connected')
    console.log('input parameter : '+socket.handshake.query.username)
    socket.on('client:message',data=>{
        console.log(`${data.username}:${data.message}`)
        data.fromMe=false;
        //data from client is now pushed to all other channels matlab message array me push ho jayega
        socket.broadcast.emit('server:message',data)
    })
    socket.on('client:typing',(name,status)=>{
        console.log(`${name} is typing`)
        
        let datan=`${name}`;
        
        //typing status is broadcasted to everyone else
        socket.broadcast.emit('server:typingStatus',datan,status)
    })
    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
})
server.listen(port,()=>console.log(`listening on port ${port}`))
