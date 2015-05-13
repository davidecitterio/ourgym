<?php
    //ESTRAGGO MENU DA DB E ESEGUO PARSING IN JSON

    $mysqli = new mysqli("localhost", "root", "", "biggym");

    if (mysqli_connect_error()){
        //se non riesco a connettermi
        echo "Error to connect to the database: ".mysqli_connect_error();
        exit();
    }

    else{
        //make the query
        $query = "SELECT * FROM menu ORDER BY id ASC";
        //extract the results
        $result = $mysqli->query($query);

        if ( $result -> num_rows > 0){
           //create an array to store the results
            $myArray = array();

            while ($row = $result -> fetch_array ( MYSQL_ASSOC)) {
                $myarray[] = array_map('utf8_encode', $row);
            }

            //export the risult in JSON
            echo json_encode ($myarray);
        }
        $result->close();
    }
$mysqli->close();
?>
