<?php
header('Content-Type: application/json');

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check for errors
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Prepare and execute the SQL query to select all attendance data
$sql = "SELECT name, date, room, status FROM attendance ORDER BY date DESC";
$result = $conn->query($sql);

// Check for errors
if (!$result) {
  die('Error: ' . $sql . '<br>' . $conn->error);
}

// Check if any attendance data was found
if ($result->num_rows == 0) {
  die('No attendance data found.');
}

// Fetch the attendance data and add it to an array
$attendanceData = array();
while ($row = $result->fetch_assoc()) {
  $attendanceData[] = $row;
}

// Close the database connection
$conn->close();

// Send the attendance data back to the Angular component as JSON
echo json_encode($attendanceData);
?>
