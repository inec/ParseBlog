<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('ttt.db');
      }
   }

   $db = new MyDB();
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
   $sql =<<<EOF
      UPDATE COMPANY set SALARY = random() where ID=1;
EOF;
$sql='UPDATE COMPANY set SALARY = 2 where ID=2';
echo $sql;
   $ret = $db->exec($sql);
   if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      echo $db->changes(), " Record updated successfully\n";
   }

   $sql =<<<EOF
      SELECT * from COMPANY;
EOF;
   $ret = $db->query($sql);
   while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
      echo '</Br>';
      echo "ID = ". $row['ID'] . "\n";
      echo "</br>";
      echo "NAME = ". $row['NAME'] ."\n";
      echo '</br>';
      echo "ADDRESS = ". $row['ADDRESS'] ."\n";
      echo "</br>";
      echo "SALARY =  ".$row['SALARY'] ."\n\n";
   }
   echo "</br>Operation done successfully\n";
   $db->close();
?>