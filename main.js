
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
    $('#data_saver').val(JSON.stringify(json));
};

function set_connection() {
    const $s = $('#server');
    const $t = $('#token');
    const $out = $('#connections');
    const $data = $('#data_saver');

    let j_d = JSON.parse($data.val());
    j_d.connections.push({"server": $s.val(), "token": $t.val()})
    $data.val(JSON.stringify(j_d))

    $out.append(`
        <div class="col-sm-6">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${$s.val()}</h5>
                <p class="card-text">${$t.val()}</p>
            </div>
        </div>
    </div>
    `);
    console.log(JSON.stringify(j_d))
}