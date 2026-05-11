<?php

require_once "../config/database.php";
require_once "../app/model/User.php";

class AuthController
{

    private $db;
    private $user;

    public function __construct()
    {

        $database = new Database();

        $this->db = $database->connect();

        $this->user = new User($this->db);
    }

    // Register
    public function register()
    {

        $data = json_decode(file_get_contents("php://input"));

        $this->user->fullname = $data->fullname;
        $this->user->email = $data->email;
        $this->user->password = $data->password;

        if ($this->user->register()) {

            echo json_encode([
                "status" => "success",
                "message" => "User registered successfully"
            ]);
        } else {

            echo json_encode([
                "status" => "error",
                "message" => "Registration failed"
            ]);
        }
    }

    // Login
    public function login()
    {

        $data = json_decode(file_get_contents("php://input"));

        $this->user->email = $data->email;
        $this->user->password = $data->password;

        $result = $this->user->login();

        if ($result) {

            echo json_encode([
                "status" => "success",
                "message" => "Login successful",
                "user" => $result
            ]);
        } else {

            echo json_encode([
                "status" => "error",
                "message" => "Invalid credentials"
            ]);
        }
    }
}
