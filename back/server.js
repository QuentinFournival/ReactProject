const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);


app.get('/chat', (req, res) => {
    res.sendFile(`${__dirname}/indexChat.html`)

})

io.on('connection', (socket) => {
    console.log("Un utilisateur s'est connecté");

    socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté");
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

});



server.listen(port, () => {
	console.log(`listen on ${port}`);
});
