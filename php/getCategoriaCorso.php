<?php
header('Access-Control-Allow-Origin: *'); 
$id = $_GET['id'];
//connection to db
$mysqli = new mysqli("localhost", "ourgym", "", "my_ourgym");

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    //echo "Successful connection"; // connection ok

    # extract results mysqli_result::fetch_array
    $query = " SELECT * FROM ((corso JOIN img_corsi ON corso.id = img_corsi.corso) JOIN categoria on categoria.id = corso.categoria)  WHERE corso.categoria = '$id' && categoria.id = '$id' ORDER BY corso.id";
    //query execution
    $result = $mysqli->query($query);
    //if there are data available
    if($result->num_rows >0)
    {
        $myArray = array();//create an array
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
           $myArray[] = array_map('utf8_encode', $row);
        }
        echo json_encode($myArray);
    }

    //free result
    $result->close();

    //close connection
    $mysqli->close();
}

?>