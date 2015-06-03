<?php
	include('./httpful.phar');
	//
session_start();
$uri="http://localhost/ghpblog/ParseBlog/tes.php?method=hello&format=json";
$uri = "https://www.googleapis.com/freebase/v1/mqlread?query=%7B%22type%22:%22/music/artist%22%2C%22name%22:%22The%20Dead%20Weather%22%2C%22album%22:%5B%5D%7D";
$response = \Httpful\Request::get($uri)->send();
 echo 'inc The Dead Weather has '.count($response->body->result->album) . " albums.\n";
 $_SESSION['size']='small';
Print_r ($_SESSION['size']);
echo "</br>";
echo $_SESSION['size']."\n123";
//echo $response->body->sha246.'inc The Dead Weather has '.$response->status ;//. count($response->body->data) . " albums.\n";
	?>