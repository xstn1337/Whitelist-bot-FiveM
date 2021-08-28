<?php
$servername = "localhost";
$name = "whitelistbot";
$username = "";
$password = "";

$key = $_GET["key"];



$conn = new mysqli($servername, $username, $password, $name);

$result = $conn->query("SELECT userkey,ip,Blacklisted,Reason,redeemed,created_at,expire_at FROM whitelistbot WHERE userkey = '$key'");

while($row = $result->fetch_assoc()){
	$database = array(
		array(
			"key" => $row["userkey"],
			"ip" => $row["ip"],
			"blacklist" => $row["Blacklisted"],
			"reason" => $row["Reason"],
			"redeemed" => $row["redeemed"],
			"created_at" => $row["created_at"],
			"expire_at" => $row["expire_at"],
		),
	);
}


if (isset($_GET["key"])) {
	foreach($database as $_ => $user) {

		$stored_blacklist = $user["blacklist"];
		$reason = $user["reason"];
		$ip = $user["ip"];
		$created_at = $user["created_at"];
		$expire_at = $user["expire_at"];

		$diff = abs(strtotime($expire_at) - strtotime($created_at));
		$years = floor($diff / (365*60*60*24));
		$months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
		$days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));



		$redeemed = $user["redeemed"];
		$stored_key = $user["key"];
		$blacklist_matches = ($stored_blacklist == "True");
		$key_matches = ($stored_key == $key);
		$kurwapadl = "yoo";
		$timenow = date("Y-m-d");
		if ($created_at >= $expire_at) {
			$message = json_encode(array('Message' => "failed", 'Expired' => "$kurwapadl"));
			echo($message);
			$conn->query("DELETE FROM whitelistbot WHERE userkey = '$key'");
		} else if ($_SERVER['REMOTE_ADDR'] == $ip) {
			$conn->query("UPDATE whitelistbot SET created_at = '$timenow' WHERE userkey = '$key'");
			$message = json_encode(array('Message'=> "success", 'Key'=> "$stored_key", 'Redeemed'=> "$redeemed", 'IP'=> "$ip", 'Blacklist'=> "$stored_blacklist", 'Reason' => "$reason", 'Created' => "$created_at", 'Expire' => "$expire_at"));
			echo($message);
		} else {
			echo 'ok?';
		}
	} 


} else {
	echo 'ok?';
}

?>
