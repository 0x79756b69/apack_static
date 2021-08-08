
// {
//      "connections": [ {
//              "server": "abc",
//              "token": "abc"
//      } ]
// }
window.onload = function() {
    if (!localStorage.getItem("connections")) {
        // JSON構造初期化。
        const json = {
            "connections" : []
        }
        localStorage.setItem("connections", JSON.stringify(json));
    }

    // メッセージ取得
    message_fetch();
    display_username();
    display_connections();
};

function notify(str) {
    const jsFrame = new JSFrame();
    jsFrame.showToast({
        html: str,
    });
}

function toast(str) {
    const jsFrame = new JSFrame();
    const frame = jsFrame.create({
        title: 'Notify',
        left: 20, top: 20, width: 320, height: 220,
        movable: true,//Enable to be moved by mouse
        resizable: true,//Enable to be resized by mouse
        html: '<div style="padding:10px;font-size:12px;color:darkgray;">' + str + '</div>'
    });
}