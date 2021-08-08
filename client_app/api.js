
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


function message_fetch() {
    let $m_out = $('#message_page');
    // 接続しているサーバー毎に取得
    let j_d = JSON.parse(localStorage.getItem("connections"));
    let s_failed = [];
    let messages_meta = [];
    for (const connection of j_d.connections) {
        const address = "https://" + connection.server + "/897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b2/"
            + "message/list/" + $('#user_name').val();
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
                            s_failed.push(connection.server)
                        } else {
                            // body => [body, from_user] から、
                            // messages => [ { 'message': 'aaa', 'from_user', 'server': 'aaa' } ] みたいなデータ構造に変換
                            for (const message of resJson.body) {
                                messages_meta.push(
                                    {
                                        "message": message.body,
                                        "from": message.from_user,
                                        "server": connection.server
                                    }
                                )
                            }
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

    // messages_metaには、サーバー関係なく、取得した全てのメッセージが入っている。
    for (const message of messages_meta) {

    }

    $m_out.append(
        `<div class="card m-2">
        <div class="card-body">
            This is some text within a card body.
        </div>
    </div>`
    )
}