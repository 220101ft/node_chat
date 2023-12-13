// Express の作成
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
// publicフォルダをWeb公開
app.use(express.static(__dirname + "/public"));

// HTTPサーバの作成
const { createServer } = require("node:http");
const server = createServer(app);

// 環境変数読み込み
const dotenv = require("dotenv");
dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

// Socket.io モジュール読み込み
const { Server } = require("socket.io");
// Socket.io で通信
const io = new Server();

// connection event
io.on("connection", (socket) => {
    console.log("connected!!!");

    //chatメッセージの受信
    socket.on("chat_message", (data) => {
        console.log(socket.id);
        console.log(data);
        //送信ユーザのSocketIDを追加
        data.socket_id = socket.id;
        //接続しているユーザにメッセージを送信
        io.emit("chat_message", data);
    });
});

// サーバ待機
server.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`);
});
