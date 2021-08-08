function set_connection() {
    const $s = $('#server');
    const $t = $('#token');

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
        insert_connection_html($s.val(), $t.val());
    } else {
        console.log("すでに存在するサーバーです。")
    }
    // console.log(JSON.stringify(j_d))
    $s.val("")
    $t.val("")
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

function display_connections() {
    let j_d = JSON.parse(localStorage.getItem("connections"));
    for (const connection of j_d.connections) {
        insert_connection_html(connection.server, connection.token);
    }
}

function insert_connection_html(server, token) {
    const $out = $('#connections');
    $out.append(`
        <div class="col-sm-4 m-1" id="${server}">
        <div class="card bg-dark text-light">
            <div class="card-body bg-dark">
                <h5 class="card-title">サーバー：${server}</h5>
                <p class="card-text">トークン：${token}</p>
                <button class="btn-danger" onclick="remove_connection('${server}')">削除</button>
            </div>
        </div>
    </div>
    `);
}

function set_username() {
    let $u = $('#user_name');
    localStorage.setItem("username", $u.val());
}
function display_username() {
    let $u = $('#user_name');
    const name = localStorage.getItem("username");
    $u.val(name)
}