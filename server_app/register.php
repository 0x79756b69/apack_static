<?php
if (isset($_POST["username"]) && isset($_POST["token"])) {
    if ($_POST["token"] == "u22_winning") {

        $dsn = "mysql:dbname=apack;host=xxx";
        $user = "xxx";
        $password = "xxx";

        $token = random(25);
        $address = "897dc182a5184d1edb259e560144927b38abe9e6c04bea46eab29786cddfd7b";
        $name = $_POST["username"];
        $data = '{
            "params":
            [
                {
                    "name": "user_id",
                    "value": "'.$name.'"
                }
            ]
        }';
        $time = date("Y-m-d H:i:s", time() + 50000);
        $json_params = '';
        try {
            $db = new PDO($dsn, $user, $password);
            $sql = 'INSERT INTO apack_token (token_id, address, data, expires_in) VALUES (:token,:address,:d, :t)';
            $prepare = $db->prepare($sql);
            $prepare->bindValue(':token',$token, PDO::PARAM_STR);
            $prepare->bindValue(':address',$address, PDO::PARAM_STR);
            $prepare->bindValue(':d',$data, PDO::PARAM_STR);
            $prepare->bindValue(':t',$time, PDO::PARAM_STR);

            if ($prepare->execute()) {
                echo "成功！<br> あなたのトークンは <code>"  .  $token  .  "</code> で、 "  .  $time. "に無効になります。<br>";
                echo "あなたが指定したユーザIDは " . h($name) . "<br> （ビジネスロジックが異なると言うことを強調するために、日本語で通知してます）";
            } else {
                echo "failed";
            }
        } catch (PDOException $e) {
            exit();
        }
    }
}

function random($n = 8)
{
    return hash('sha3-224', substr(base_convert(bin2hex(openssl_random_pseudo_bytes($n)),16,36),0,$n));
}
function h($s)
{
    return htmlspecialchars($s);
}