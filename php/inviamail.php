<?php
header('Access-Control-Allow-Origin: *'); 
$data = json_decode($_REQUEST['json']);

$to="davidecitt@hotmail.it"; // Your Email

$subject="Contatto da OURGYM.COM";

$date=date("l, F jS, Y");
$time=date("h:i A");

$total = count($data);
$valida = true;
$type = 'contact';
$email = '';

for ($i = 0; $i < $total; $i++){

	if($data[$i]->name == 'type'){ $type = $data[$i]->value; }
	if($data[$i]->name == 'email'){ $email = $data[$i]->value; }

	if ($data[$i]->required and strlen($data[$i]->value) < 3){

		echo "<div class='alert alert-danger'>
			<a class='close' data-dismiss='alert'>×</a>
			<strong>Warning!</strong> Please fill the ".$data[$i]->name." field.
		</div>";
		$valida = false;
		break;
	}

	if ($data[$i]->validate){
		$val = validate($data[$i]);

		if(!$val[0]){
			echo "<div class='alert alert-danger'>
					<a class='close' data-dismiss='alert'>×</a>
					<strong>Warning!</strong> ".$val[1]."
				</div>";
			$valida = false;
			break;
		}
	}
}

if ($valida) {
	$msg  = "";
	$msg .= "Message sent from website on date:  $date, hour: $time.<br/><br/>";

	for ($i = 0; $i < $total; $i++){
		$msg .= "<strong>".$data[$i]->name."</strong>: ".$data[$i]->value."<br/>";
	}

	if ($type == 'contact'){
		mail($to,$subject,$msg,"From:".$email);

	} else {
		//...
	}

	echo "<div class='alert alert-success'>
		<a class='close' data-dismiss='alert'>×</a>
		<strong>Grazie!</strong>
	</div>";
}

function validate(){
	//...
	return array(true, '');
}
?>
