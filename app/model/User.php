<?php

class User
{

    private $conn;
    private $table = "users";

    public $fullname;
    public $email;
    public $password;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Register User
    public function register()
    {

        $query = "INSERT INTO " . $this->table . "
                  (fullname, email, password)
                  VALUES (:fullname, :email, :password)";

        $stmt = $this->conn->prepare($query);

        $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);

        $stmt->bindParam(":fullname", $this->fullname);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $hashedPassword);

        return $stmt->execute();
    }

    // Login User
    public function login()
    {

        $query = "SELECT * FROM " . $this->table . "
                  WHERE email = :email LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":email", $this->email);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row && password_verify($this->password, $row['password'])) {

            return $row;
        }

        return false;
    }
}
