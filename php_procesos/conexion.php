<?php
	//Conexion
	$dsn = 'mysql:host=localhost;dbname=truedataerp;';
	$user = 'root';
	$password = 'rjdg';
	try
	{
		$dbh = new PDO($dsn, $user, $password);
	}
	catch (PDOException $e)
	{
		echo 'Conexion fallida: ' . $e->getMessage();
	}
?>

