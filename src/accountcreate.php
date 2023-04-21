<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$idNumber = $data['idNumber'];
$type = $data['type'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Prepare and bind statement to insert new user into the database
$stmt = $conn->prepare('INSERT INTO users (name, email, id_number, type, password) VALUES (?, ?, ?, ?, ?)');
$stmt->bind_param('sssss', $name, $email, $idNumber, $type, $password);

// Execute statement and check for errors
if ($stmt->execute()) {
  $response = [
    'success' => true,
    'message' => 'Account created successfully!',
  ];
} else {
  $response = [
    'success' => false,
    'message' => 'An error occurred while creating your account. Please try again later.',
  ];
}

// Close statement and database connection
$stmt->close();
$conn->close();

// Send response to client
echo json_encode($response);

?>
