
// ドキュメントに沿って実装する。
//
//
function message_submit() {
    let $m = $('#message');
    let $to = $('#to');
    let j_d = JSON.parse(localStorage.getItem("connections"));

    let details = {
        'body': $m.val(),
        'user_id': $('#user_name').val()
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    // 接続しているサーバー毎に送信
    let s_failed = [];
    for (const connection of j_d.connections) {
        const address = "https://" + connection.server + "/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/"
            + "message/add/" + $to.val();
        fetch(address, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'AUTHORIZATION-APACK': connection.token
            },
            body: formBody,
            mode: "cors"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json().then(resJson => {
                        if (resJson.status !== 200) {
                            s_failed.push(connection.server)
                        }
                    });
                }
                throw new Error('Network response was not ok.');
            })
            .catch(error => {
                console.error(error);
            })
    }
    if (s_failed.length !== 0) {
        for (const s of s_failed) {
            toast(s + "との接続に失敗しました")
        }
    }
}


async function message_fetch() {
    // 接続しているサーバー毎に取得
    let j_d = JSON.parse(localStorage.getItem("connections"));
    let s_failed = [];
    let messages_meta = [];
    for (const connection of j_d.connections) {
        const address = "https://" + connection.server + "/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/"
            + "message/list/" + localStorage.getItem("username");
        // console.log(address)
        fetch(address, {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'AUTHORIZATION-APACK': connection.token
            },
            mode: "cors"
        })
            .then((response) => {
                if (response.ok) {
                    return response.json().then(resJson => {
                        if (resJson.status !== 200) {
                            s_failed.push(connection.server);
                        } else {
                            // body => [body, from_user] から、
                            // messages => [ { 'message': 'aaa', 'from_user', 'server': 'aaa' } ] みたいなデータ構造に変換
                            // console.log("呼び出されました" + JSON.stringify(messages_meta))
                            for (const message of resJson.body) {
                                messages_meta.push(
                                    {
                                        "message": message.body,
                                        "from": message.from_user,
                                        "server": connection.server
                                    }
                                )
                                // console.log("ここまで良いです" + JSON.stringify(messages_meta))
                            }
                        }
                        localStorage.setItem("messages", JSON.stringify(messages_meta))
                        localStorage.setItem("failed_log", JSON.stringify(s_failed))
                    });
                }
                throw new Error('Network response was not ok.');
            })
            .catch(error => {
                console.error(error);
            })
    }
    // Todo: Await
    notify("Fetching...")
    setTimeout(fetch_display, 4000)
}
function fetch_display() {
    let $m_out = $('#message_page');
    let displays = [];
    let messages_meta = JSON.parse(localStorage.getItem("messages"));
    let s_failed = JSON.parse(localStorage.getItem("failed_log"));

    if (s_failed.length !== 0) {
        for (const s of s_failed) {
            toast(s + "との接続に失敗しました")
        }
    }
    console.log(messages_meta)
    for (const message of messages_meta) {
        let i = 0;
        let r = false;
        for (const display of displays) {
            if (display.message === message.message) {
                displays[i].server.push(message.server);
                r = true
            }
            i ++
        }
        if (!r) {
            displays.push(
                {
                    "message": message.message,
                    "from": message.from,
                    "server": [message.server]
                }
            )
        }
    }

    for (const display of displays) {
        $m_out.append(
            `
    <div class="card m-2">
        <div class="card-body">
            <code>${display.from}</code> says: <b>${display.message}</b> <br>
            <small>Received: ${display.server.join(', ')}</small>
        </div>
    </div>`
        )
    }
}