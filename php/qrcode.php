<?php

/*
	Author: YChi Lu
    Github  ogiginal Author: Iszuddin Ismail 
	POC only based on others effort,
    Testing out implementation of Google Authenticator for login. This demo  uses Google Authenticator library from PHPGangsta
    https://github.com/PHPGangsta/GoogleAuthenticator
*/

require_once 'gauth.php';
require_once 'tes.php';
$ga = new GoogAuth();

$email = (isset($_REQUEST['email'])) ? strtolower(trim($_REQUEST['email'])) : false;
$code = (isset($_REQUEST['code'])) ? strtolower(trim($_REQUEST['code'])) : false;
$action =  (isset($_REQUEST['action'])) ? strtolower(trim($_REQUEST['action'])) : '' ;

$app_name = "DogCU";


// part3 -- test the code againsts Google Authenticator
if ($action == 'auth') {
    if (!file_exists(md5($email))) { show_error("unknown account"); }
    if (!$code) { show_error("code cannot be empty"); }
    
    $secret_key = file_get_contents(md5($email));
    $checkResult = $ga->verifyCode($secret_key, $code, 2);    // 2 = 2*30sec clock tolerance
    
	        $response['code'] = 1;
		$response['status'] = $api_response_code[ $response['code'] ]['HTTP Response'];
    if ($checkResult) {
       		$response['data']= true;
		$response['member'] = $email;
				$response['msg'] = "AuthResult";
				$response['AuthResult'] = true;
	   deliver_response('json', $response);
    } else {

            $account = $app_name.'-'.$email;
            	

            $qrCodeUrl = $ga->getQRCodeGoogleUrl($account, $secret_key);
					$response['data']= true;
		$response['member'] = $email;
				$response['msg'] = "AuthResult";
				$response['AuthResult'] = false;
				
												$response['key'] = $secret_key;
								$response['account'] = $account;
									$response['url'] = $qrCodeUrl;
	   deliver_response('json', $response);
       // show_error("Wrong code. Please try again.".$secret_key);    
    }

// if registered, request for code, if not, register user
} elseif ($action == 'part2') {
//echo $email;
   if ($email ) {
        $response['code'] = 1;
		$response['status'] = $api_response_code[ $response['code'] ]['HTTP Response'];
	   if (file_exists(md5($email))) { // registered in the past
	   

		$response['data']= true;
		$response['member'] = $email;
	   deliver_response('json', $response);
	   /*
	        echo $_REQUEST['action'];
            echo "<br>Enter the code for $app_name from Google Authenticator<br>";
            echo "<form action='qrcode.php?action=part3' method='post'>";
            echo "<input type='text' name='email' value='$email' readonly /><br />";
            echo "<input type='text' name='code' /><br />";
            echo "<button type='submit'>SUBMIT</button>";
            echo "</form>";*/

        } else {
     		// new registration
            $secret_key = $ga->createSecret();
            $account = $app_name.'-'.$email;
            file_put_contents(md5($email), $secret_key);
			

            $qrCodeUrl = $ga->getQRCodeGoogleUrl($account, $secret_key);
            echo "<img src='$qrCodeUrl' /><br />";
            echo "or enter this code manually into Google Authenticator<br/>";
            echo "Your Account : $account<br/>";
            echo "Your Key : $secret_key<br/>";
            echo "When you are ready, click the button below.<br />";
            echo "<form action='qrcode.php?action=part2' method='post'>";
            echo "<input type='hidden' name='email' value='$email' />";
            echo "<button type='submit'>CONTINUE</button>";
            echo "</form>";
        }
    } else {
        show_error("invalid email format");
    } 
}
elseif ($action == 'create')
{
        $response['code'] = 1;
		$response['status'] = $api_response_code[ $response['code'] ]['HTTP Response'];
 if ($email )
 {
 $response['member'] = $email;
  $response['data']= true;
   if (file_exists(md5($email))) { // registered in the past
	   

		$response['data']= true;
		$response['member'] = $email;
				$response['msg'] = "existed";
	   deliver_response('json', $response);
	   /*
	        echo $_REQUEST['action'];
            echo "<br>Enter the code for $app_name from Google Authenticator<br>";
            echo "<form action='qrcode.php?action=part3' method='post'>";
            echo "<input type='text' name='email' value='$email' readonly /><br />";
            echo "<input type='text' name='code' /><br />";
            echo "<button type='submit'>SUBMIT</button>";
            echo "</form>";*/

        } else {
			$secret_key = $ga->createSecret();
            $account = $app_name.'-'.$email;
            file_put_contents(md5($email), $secret_key);
			

            $qrCodeUrl = $ga->getQRCodeGoogleUrl($account, $secret_key);
					$response['data']= true;
		$response['member'] = $email;
				$response['msg'] = "new";
								$response['key'] = $secret_key;
								$response['account'] = $account;
									$response['url'] = $qrCodeUrl;
		}
			   deliver_response('json', $response);
 }
 else
 {
 $response['data']= false;
 }
 
   deliver_response('json', $response);
}
else {

if( strcasecmp($_GET['method'],'hello') == 0){
    $response['code'] = 1;
    $response['status'] = $api_response_code[ $response['code'] ]['HTTP Response'];
    $response['data'] = 'Hello World';
}
 
 
 
// --- Step 4: Deliver Response
 
// Return Response to browser
//$friendid = isset($_GET['friendid']) ? $_GET['friendid'] : 'empty';
/*if (isset($_GET['format']))
{
deliver_response($_GET['format'], $response);
}
else
{
deliver_response('json', $response);
}*/
   echo "L-95 Enter email address to proceed with login.";
    echo "<form action='". $_SERVER['PHP_SELF']."?action=part2&format=json' method='POST'>";
    echo "<input type='text' name='email' value='' />";
    echo "<button type='submit'>LOGIN</button>";
    echo "</form>";    
}






function show_error($errmessage){
    echo $errmessage.'<br/>';
    echo '<a href="qrcode.php">Got Back Home</a>';
}
