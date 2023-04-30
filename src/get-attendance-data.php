<?php
header('Content-Type: application/json');

// Create connection to MySQL database
$conn = new mysqli('localhost', 'root', '', 'cict_scheduling_key_inv');

// Check for errors
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// Get current date
$current_date = date('Y-m-d');

// Query database for attendance data on current date
$sql = "SELECT COUNT(*) as count, status FROM attendance WHERE date = '$current_date' GROUP BY status";
$result = $conn->query($sql);

// Check for errors
if (!$result) {
  die('Error: ' . $sql . '<br>' . $conn->error);
}

// Build attendance data object
$attendance_data = array('present' => 0, 'absent' => 0);
while ($row = $result->fetch_assoc()) {
  if ($row['status'] == 'present') {
    $attendance_data['present'] = (int) $row['count'];
  } else if ($row['status'] == 'absent') {
    $attendance_data['absent'] = (int) $row['count'];
  }
}

// Close the database connection
$conn->close();

// Send attendance data as JSON response
echo json_encode($attendance_data);
?>
