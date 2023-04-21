$servername = "localhost";
$username = "admin";
$password = "password";
$dbname = "cict_scheduling_key_inv";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// Get all keys
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $result = $conn->query("SELECT * FROM keys");
  $keys = array();
  while ($row = $result->fetch_assoc()) {
    $keys[] = $row;
  }
  echo json_encode($keys);
}
