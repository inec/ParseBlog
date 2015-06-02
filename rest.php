<?php
	include('./httpful.phar');
	//

$uri="http://localhost/gitphp/tes.php?method=hello&format=json";
//$uri = "https://www.googleapis.com/freebase/v1/mqlread?query=%7B%22type%22:%22/music/artist%22%2C%22name%22:%22The%20Dead%20Weather%22%2C%22album%22:%5B%5D%7D";
$response = \Httpful\Request::get($uri)->send();
 
echo $response->body->sha246.'inc The Dead Weather has '.$response->status ;//. count($response->body->data) . " albums.\n";
	?>