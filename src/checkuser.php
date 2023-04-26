<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
ob_start();
header('Content-Type: application/json');

// Start the session
session_start();

// Check if user is authenticated as a faculty member
if (isset($_SESSION['user']) && $_SESSION['user']['type'] === 'faculty') {
  // User is authenticated as a faculty member, return success response
  $response = [
    'success' => true,
    'message' => 'User is authenticated as a faculty member.',
    'user' => $_SESSION['user']
  ];
} else {
  // User is not authenticated as a faculty member, return error response
  $response = [
    'success' => false,
    'message' => 'User is not authenticated as a faculty member.'
  ];
}

// Send response to client
echo json_encode($response);

?>
