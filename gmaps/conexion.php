<?php
	//Conexion
	$dsn = 'mysql:host=72.167.233.95;dbname=truedataerp;';
	$user = 'truedataerp';
	$password = 'Tru3d4t4';
	try
	{
		$dbh = new PDO($dsn, $user, $password);
	}
	catch (PDOException $e)
	{
		echo 'Conexion fallida: ' . $e->getMessage();
	}
?>

