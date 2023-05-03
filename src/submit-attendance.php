<?php
header('Content-Type: application/json');

// Get the POST data from the Angular component
$data = json_decode(file_get_contents('php://input'));

// Create connection to MySQL database
$conn = new mysqli('auth-db612.hstgr.io', 'u456146523_cmkis', 'Taelol12345@', 'u456146523_cict_schedule');

// Check for errors
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Check if name is set and not null
if (!isset($data->name) || $data->name === null) {
  die('Error: name is required. Received data: ' . json_encode($data));
}

// Get the user ID for the selected user name
$sql = "SELECT id FROM users WHERE name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $data->name);
$stmt->execute();
$result = $stmt->get_result();

// Check for errors
if (!$result) {
  die('Error: ' . $sql . '<br>' . $conn->error);
}

// Check if a user with the selected name exists
if ($result->num_rows == 0) {
  die('Error: user with name "' . $data->name . '" does not exist.');
}

// Get the user ID from the query result
$row = $result->fetch_assoc();
$user_id = $row['id'];

// Prepare and execute the SQL query to insert the attendance data
$sql = "INSERT INTO attendance (user_id, name, date, room, status) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('issss', $user_id, $data->name, $data->date, $data->room, $data->status);
$stmt->execute();

// Check for errors
if ($stmt->error) {
  die('Error: ' . $sql . '<br>' . $stmt->error);
}

// Close the database connection
$conn->close();

// Send a success response back to the Angular component
echo json_encode(array('success' => true));
?>
