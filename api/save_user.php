<?php
header("Content-Type: application/json");

// Show errors in container logs
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = "mysql";
$user = "demo_user";
$pass = "demo123";
$db   = "demo_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed: " . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
    exit;
}

$name  = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");

if ($name === "" || $email === "") {
    echo json_encode(["status" => "error", "message" => "Name and Email required"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO students (name, email) VALUES (?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("ss", $name, $email);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User saved successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
