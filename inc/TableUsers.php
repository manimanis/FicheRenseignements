<?php
class TableUsers extends TableBase
{
    protected string $_tablename = 'users';
    protected array $_fields = ['id', 'pseudo', 'passwd', 'role', 'salt', 'actif'];
    protected array $_primary_key = ['id'];
    protected string $_autoincrement = 'id';

    public function hasPseudo(string $username) {
        $row = $this->fetch_one(["where" => "pseudo = :pseudo"], ["pseudo" => $username]);
        return $row != null;
    }

    public function isValidLogin(string $username, string $userpass) {
        $sql = "SELECT * FROM {$this->_tablename} WHERE pseudo = :pseudo AND md5(concat(:passwd, salt)) = passwd";
        return $this->query_one($sql, ['pseudo' => $username, 'passwd' => $userpass]);
    }

    public function createLogin(string $username, string $userpass, string $role = 'E') {
        $salt = generateSalt();
        $data = [
            'pseudo' => $username,
            'passwd' => md5($userpass . $salt),
            'salt' => $salt,
            'role' => $role,
            'actif' => true
        ];
        return $this->insert($data);
    }

    public function changeLogin(int $user_id, string $userpass) {
        $salt = generateSalt();
        $data = [
            'id' => $user_id,
            'salt' => $salt,
            'passwd' => md5($userpass . $salt)
        ];
        return $this->update($data, "id = :id");
    }
}