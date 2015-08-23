<?php
const DEFAULT_URL = 'https://inec.firebaseio.com/';
const DEFAULT_TOKEN = 'token';
const DEFAULT_PATH = '/PHP-firebase/example';

require __DIR__ . '/vendor/autoload.php';

$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);

// --- storing an array ---
$test = array(
    "foo" => "bar",
    "i_love" => "lamp",
    "id" => 42
);
$dateTime = new DateTime();
$firebase->set(DEFAULT_PATH . '/' . $dateTime->format('c'), $test);

// --- storing a string ---
$firebase->set(DEFAULT_PATH . '/name/contact001', "contac1 is John Doe");

// --- reading the stored string ---
$name = $firebase->get(DEFAULT_PATH . '/name/contact001');

echo $name;
?>