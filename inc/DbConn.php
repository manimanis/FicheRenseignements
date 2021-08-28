<?php

define('HOST', '127.0.0.1');
define('USER', 'root');
define('PASS', 'mysqlroot');
// define('PASS', '');
define('BASE', 'fiches_rens');

class DbConn
{
    private static ?DbConn $db = null;

    private ?PDO $_conn = null;

    private function __construct()
    {
        $this->_conn = new PDO("mysql:host=" . HOST . ";dbname=" . BASE . ";charset=utf8mb4", USER, PASS);
        $this->_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public static function getInstance()
    {
        if (DbConn::$db == null) {
            DbConn::$db = new DbConn();
        }
        return DbConn::$db->_conn;
    }
}
