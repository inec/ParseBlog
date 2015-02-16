<?php
$db=new PDO('sqlite:bolt.sqlite');
$sql='SELECT id FROM bolt_pages';
$result =$db->query($sql);
echo displayResult($result);
//$database = new SQLiteDatabase('mydb.db');

function displayResult($result)
{
	$r='';
	while($row = $result->fetchObject()){
 $r .='<td>'. htmlspecialchars($row->id).'</td>';
	}
	return $r;
}
?>