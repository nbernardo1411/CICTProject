<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$idNumber = $data['idNumber'];
$type = $data['type'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// Validate email address
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $response = [
    'success' => false,
    'message' => 'Invalid email address.',
  ];
} else {
  // Create connection to MySQL database
  $conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

  // Check if connection succeeded
  if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
  }

  // Check if email already exists in the database
  $check_email_query = "SELECT id FROM users WHERE email=?";
  $check_email_stmt = $conn->prepare($check_email_query);
  $check_email_stmt->bind_param('s', $email);
  $check_email_stmt->execute();
  $check_email_result = $check_email_stmt->get_result();
  if ($check_email_result->num_rows > 0) {
    $response = [
      'success' => false,
      'message' => 'The account already exists.',
    ];
  } else {
    // Prepare and bind statement to insert new user into the database
    $insert_query = "INSERT INTO users (name, email, id_number, type, password) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($insert_query);
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

    // Close statement
    $stmt->close();
  }

  // Close check_email statement and database connection
  $check_email_stmt->close();
  $conn->close();
}

// Send response to client
echo json_encode($response);

?>
