
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

header("Content-Type: application/json");



require_once __DIR__ . '/../app/controller/AuthController.php';

//require_once __DIR__ . '/../app/controller/AuthController.php';



//require_once __DIR__ . '/../app/controller/AuthController.php';


//require_once "app/controller/AuthController.php";

$url = $_GET['url'] ?? '';

$auth = new AuthController();

switch ($url) {

    case 'register':
        $auth->register();
        break;

    case 'login':
        $auth->login();
        break;

    default:
        echo json_encode([
            "message" => "Route not found"
        ]);
}
