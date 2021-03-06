<?php
header('Access-Control-Allow-Origin: *'); 
//connection to db
$mysqli = new mysqli("localhost", "ourgym", "", "my_ourgym");

$ordine = $_GET['ord'];

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    //echo "Successful connection"; // connection ok

    # extract results mysqli_result::fetch_array
    
    if ($ordine != "")
         $query = " SELECT * FROM corso, img_corsi, livello WHERE corso.id = img_corsi.corso AND livello.id = '$ordine' AND livello.id = corso.livello ORDER BY titolo ASC  ";
    //query execution
    else
    $query = " SELECT * FROM corso JOIN img_corsi WHERE corso.id = img_corsi.corso ORDER BY titolo ASC  ";
    //query execution
    $result = $mysqli->query($query);
    //if there are data available
    if($result->num_rows >0)
    {
        $myArray = array();//create an array
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = $row;
        }
        echo json_encode($myArray);
    }

    //free result
    $result->close();

    //close connection
    $mysqli->close();
}

?>