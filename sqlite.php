class medoo
<?php 
{
	protected $database_type = 'sqlite';
 
	// For SQLite [optional]
	//protected $database_file = 'c:\xampp\database.db';
 
// And get started!
require_once 'medoo.min.php';
 
$database = new medoo('database.db');
 
// Or via independent configuration
$database = new medoo([  
	'database_type' => 'sqlite',
	'database_file' => 'database.db'
]);
 
$database->insert("account", [
	"user_name" => "foo",
	"email" => "foo@bar.com"
]); ?>