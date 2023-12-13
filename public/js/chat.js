// Chatサーバに接続
const URL = "";
const socket = io.connect(URL);

socket.on("chat_message", (data) => {
    console.log(data);
});

function sendMessage() {
    // console.log("send message");
    var message = document.getElementById("message").value;
    console.log(message);
    if (message) {
        // データを作成
        var data = { message: message };
        socket.emit("chat_message", data);
    }
}
