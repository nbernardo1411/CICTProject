<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check if connection succeeded
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Prepare and bind statement to select schedule data for a specific faculty member from the database
$stmt = $conn->prepare('SELECT faculty_name, CAST(schedule_data AS CHAR) AS schedule_data FROM schedules WHERE faculty_name = ?');
$stmt->bind_param('s', $_GET['faculty_name']);
$stmt->execute();

// Bind result variables
$stmt->bind_result($facultyName, $scheduleData);

// Fetch results and store them in an array
$schedules = [];
while ($stmt->fetch()) {
  $schedules[] = [
    'faculty_name' => $facultyName,
    'schedule_data' => $scheduleData,
  ];
}

// Close statement
$stmt->close();

// Send response to client
echo json_encode([
  'success' => true,
  'schedules' => $schedules,
]);

// Close database connection
$conn->close();
?>
