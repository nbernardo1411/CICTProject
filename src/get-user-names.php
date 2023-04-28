<?php

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check for errors
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Get the list of user names from the database
$sql = "SELECT name FROM users";
$result = $conn->query($sql);

// Check for errors
if (!$result) {
  die('Error: ' . $sql . '<br>' . $conn->error);
}

// Create an array to hold the user names
$userNames = array();

// Loop through the query results and add the user names to the array
while ($row = $result->fetch_assoc()) {
  $userNames[] = $row['name'];
}

// Close the database connection
$conn->close();

// Send the user names back to the Angular component
echo json_encode($userNames);

?>
