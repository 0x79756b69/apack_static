
// {
//      "connections": [ {
//              "server": "abc",
//              "token": "abc"
//      } ]
// }
window.onload = function() {
    // JSON構造初期化。
    const json = {
        "connections" : []
    }
    localStorage.setItem("connections", JSON.stringify(json));

    // メッセージ取得
    message_fetch()
};

function set_connection() {
    const $s = $('#server');
    const $t = $('#token');
    const $out = $('#connections');

    let j_d = JSON.parse(localStorage.getItem("connections"));
    let is_already = false;
    for (const connection of j_d.connections) {
        if (connection.server === $s.val()) {
            is_already = true
            break
        }
    }
    if (!is_already) {
        j_d.connections.push({"server": $s.val(), "token": $t.val()})
        localStorage.setItem("connections", JSON.stringify(j_d));

        $out.append(`
        <div class="col-sm-4 m-1" id="${$s.val()}">
        <div class="card bg-dark text-light">
            <div class="card-body bg-dark">
                <h5 class="card-title">サーバー：${$s.val()}</h5>
                <p class="card-text">トークン：${$t.val()}</p>
                <button class="btn-danger" onclick="remove_connection('${$s.val()}')">削除</button>
            </div>
        </div>
    </div>
    `);
    } else {
        console.log("すでに存在するサーバーです。")
    }
    console.log(JSON.stringify(j_d))
}

function remove_connection(server) {
    $('#' + server).remove();
    let j_d = JSON.parse(localStorage.getItem("connections"));
    j_d.connections.forEach((item, index) => {
        if (item.server === server) {
            j_d.connections.splice(index, 1);
        }
    })
    localStorage.setItem("connections", JSON.stringify(j_d))
}



// ドキュメントに沿って実装する。
//
//
function message_submit() {
    let $m_input = $('#message');
    
    
}

function message_fetch() {
    let $m_out = $('#message_page');
    $m_out.append(
        `<div class="card">
        <div class="card-body">
            This is some text within a card body.
        </div>
    </div>`
    )
}