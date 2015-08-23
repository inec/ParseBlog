<?php

require_once 'config.php';
require __DIR__ . '/vendor/autoload.php';

const DEFAULT_PATH = '/GoogleAuth';
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
//$firebase->set(DEFAULT_PATH . '/name/contact001', "value");

// --- reading the stored string ---
$name = $firebase->get(DEFAULT_PATH . '/name/contact001');


echo ($name!='null'? 'f':'t');
?>