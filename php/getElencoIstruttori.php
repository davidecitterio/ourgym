<?php
header('Access-Control-Allow-Origin: *'); 
//connection to db
$mysqli = new mysqli("localhost", "ourgym", "", "my_ourgym");

if (mysqli_connect_errno()) { //verify connection
    echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
    exit(); //do nothing else 
}
else {
    //echo "Successful connection"; // connection ok

    # extract results mysqli_result::fetch_array
    $query = " SELECT i.id,  i.nome AS nomeistruttore, img.percorso, c.nome AS nomecategoria FROM 
    
    (((istruttore AS i JOIN img_istruttori AS img on i.id = img.id)
    JOIN responsabile AS r on i.id = r.id_istruttore) JOIN
    categoria AS c on c.id = r.id_categoria)
    
    ORDER BY i.nome ASC  ";
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