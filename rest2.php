<!DOCTYPE HTML> 
<html>
<head>
</head>
<body> 

<?php
	if(!isset($_SESSION)) 
    { 
        session_start(); 
    } 
// define variables and set to empty values
$name = $email = $gender = $comment = $website = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $name = test_input($_POST["name"]);
   $email = test_input($_POST["email"]);
   $website = test_input($_POST["website"]);
   $comment = test_input($_POST["comment"]);
   $gender = test_input($_POST["gender"]);
}

function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
?>

<h2>PHP Form Validation Example</h2>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"> 
   Name: <input type="text" name="name">
   <br><br>
   E-mail: <input type="text" name="email">
   <br><br>
   Website: <input type="text" name="website" value=<?php echo   "website.uri" ?>>
   <br><br>
   Comment: <textarea name="comment" rows="5" cols="40"></textarea>
   <br><br>
   Gender:
   <input type="radio" name="gender" value="female">Female
   <input type="radio" name="gender" value="male">Male
   <br><br>
   <input type="submit" name="submit" value="Submit"> 
</form>
<?php
	include('./httpful.phar');
	//
$pdata=array(
  'id'=>'71604',
  'appId'=>'sunova'
  );  
$uri="http://localhost/ghpblog/ParseBlog/tes.php?method=hello&format=json";
$uri = "https://www.googleapis.com/freebase/v1/mqlread?query=%7B%22type%22:%22/music/artist%22%2C%22name%22:%22The%20Dead%20Weather%22%2C%22album%22:%5B%5D%7D";
//$uri="https://m.ca/api/Login/GenerateSeed";

$response = "test";//\Httpful\Request::get($uri)->send();
//$response = \Httpful\Request::post($uri)->contentType('application/x-www-form-urlencoded')->body($pdata)->send();

$jsonString = '{"_loginInfo":{"id":71604,"hash":"z5i0YD67=",
"rowno":0},"id":716}';
echo $jsonString;

$jObj=json_decode($jsonString);
$logIn=$jObj->_loginInfo;
$logIn->id=700;
echo "<hr/>".$logIn->hash."<br/>".$logIn->id."<br/>w";
$postdata = array( 
  'key' => '{removedAPIkey}',
  'message' => array (
    
    'from_name'   =>  "name",
    'from_email'  =>  "email",
   
    'html'    =>  "ml"
    ),
  'async' => true
        );


//echo "<br/>".$response->body->result->name;
echo $response;

//echo ' sinc The Dead Weather '.$response->status." albums.\n";
//echo ' sinc The Dead Weather '.count($response->body->result->album) . " albums.\n";
 $_SESSION['size']='small';
Print_r ($_SESSION['size']);
echo "</br>";
echo "\n user path home aggin";
echo $_SESSION['size']."\n123";
echo "<hr/>session id </br>". session_id()."<hr/>";
echo $response."<hr/>".$website;
//echo $temp[1]."=",	$temp[12];
//echo $response->body->sha246.'inc The Dead Weather has '.$response->status ;//. count($response->body->data) . " albums.\n";
	?>
<?php
echo "<h2>Your Input:</h2>";
echo $name;
echo "<br>";
echo $email;
echo "<br>";
echo $website;
echo "<br>";
echo $comment;
echo "<br>";
echo $gender;
/* stack overlfow
$url = 'https://mandrillapp.com/api/1.0/messages/send.json';
$data = array( 
  'key' => '{removedAPIkey}',
  'message' => array (
    'to'    =>  array( array( "email" => $_to ) ),
    'from_name'   =>  Auth::user()->name,
    'from_email'  =>  Auth::user()->email,
    'subject' =>  $_subject,
    'html'    =>  $_body
    ),
  'async' => true
        );
		
		echo json_encode($data);
{"key":"{removedAPIkey}","message":{"to":[{"email":null}],"from_name":"ad","from_email":"email","subject":null,"html":null},"async":true}
$request = Httpful::post($url)->sendsJson()->body($data)->send();

if ( $request->body[0]->status == "queued" ) {
    $success = true;
}*/
?>

</body>
</html>

	
	