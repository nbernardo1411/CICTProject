<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cict_scheduling_key_inv";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Add a new key
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $name = $data['name'];
  $room = $data['room'];

  $stmt = $conn->prepare("INSERT INTO `keys` (`name`, `room`) VALUES (?, ?)");
  $stmt->bind_param("ss", $name, $room);

  if ($stmt->execute()) {
    $key = array(
      'id' => $stmt->insert_id,
      'name' => $name,
      'room' => $room,
      'borrowed' => false,
      'borrowedBy' => null,
      'borrowedAt' => null
    );
    echo json_encode($key);
  } else {
    http_response_code(500);
    echo json_encode(array('message' => 'Unable to add key'));
  }
}

// Borrow a key
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  $data = json_decode(file_get_contents('php://input'), true);
  $id = $data['id'];
  $borrowed = $data['borrowed'];
  $borrowedBy = $data['borrowedBy'];
  $borrowedAt = $data['borrowedAt'];

  $stmt = $conn->prepare("UPDATE `keys` SET `borrowed`=?, `borrowedBy`=?, `borrowedAt`=? WHERE `id`=?");
  $stmt->bind_param("issi", $borrowed, $borrowedBy, $borrowedAt, $id);

  if ($stmt->execute()) {
    echo json_encode(array('message' => 'Key updated'));
  } else {
    http_response_code(500);
    echo json_encode(array('message' => 'Unable to update key'));
  }
}

// Delete a key
// Delete a key
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  $id = $_GET['id'];

  $stmt = $conn->prepare("DELETE FROM `keys` WHERE `id`=?");
  $stmt->bind_param("i", $id);

  if ($stmt->execute()) {
    echo json_encode(array('message' => 'Key deleted'));
  } else {
    http_response_code(500);
    echo json_encode(array('message' => 'Unable to delete key'));
  }
}


// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get all keys
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $stmt = $conn->prepare("SELECT * FROM `keys`");
  $stmt->execute();
  $result = $stmt->get_result();
  $keys = array();
  while ($row = $result->fetch_assoc()) {
    $keys[] = $row;
  }
  echo json_encode($keys);
}

?>
