<?php
	//Conexion
	$dsn = 'mysql:host=dhcp_server.db.3518383.hostedresource.com;dbname=dhcp_server;';
	$user = 'dhcp_server';
	$password ='Docsis.inc2009';
	try
	{
		$dbh1 = new PDO($dsn, $user, $password);
	}
	catch (PDOException $e)
	{
		echo 'Conexion fallida: ' . $e->getMessage();
	}
?>

