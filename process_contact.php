<?php
// Set headers to prevent CORS issues
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["success" => false, "message" => "Only POST requests are allowed"]);
    exit;
}

// Get form data
$data = json_decode(file_get_contents("php://input"), true);

// If form was submitted traditionally (not as JSON)
if (empty($data)) {
    $data = $_POST;
}

// Validate required fields
$required_fields = ["name", "email", "subject", "message"];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        $errors[] = ucfirst($field) . " is required";
    }
}

// Validate email format
if (!empty($data["email"]) && !filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format";
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "errors" => $errors]);
    exit;
}

// Prepare email content
$to = "vukamanufacturing@gmail.com"; // Replace with your email
$subject = "Contact Form: " . htmlspecialchars($data["subject"]);

// Build email body
$body = "Name: " . htmlspecialchars($data["name"]) . "\n";
$body .= "Email: " . htmlspecialchars($data["email"]) . "\n";

if (!empty($data["phone"])) {
    $body .= "Phone: " . htmlspecialchars($data["phone"]) . "\n";
}

$body .= "Subject: " . htmlspecialchars($data["subject"]) . "\n\n";
$body .= "Message:\n" . htmlspecialchars($data["message"]);

// Set email headers
$headers = "From: " . htmlspecialchars($data["email"]) . "\r\n";
$headers .= "Reply-To: " . htmlspecialchars($data["email"]) . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mail_sent = mail($to, $subject, $body, $headers);

// Return response
if ($mail_sent) {
    echo json_encode([
        "success" => true,
        "message" => "Thank you for your message! We will get back to you soon."
    ]);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode([
        "success" => false,
        "message" => "Sorry, there was an error sending your message. Please try again later."
    ]);
}
?>
