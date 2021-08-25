<?php

class TableBase extends DbBase
{
    protected string $_tablename = 'dummy';
    protected array $_fields = [];
    protected array $_primary_key = [];
    protected string $_autoincrement = '';

    protected function insert_query(array $data)
    {
        $fields = "";
        $placeholder = "";
        foreach ($data as $key => $value) {
            if (in_array($key, $this->_fields)) {
                if ($fields != "") {
                    $fields .= ", ";
                    $placeholder .= ", ";
                }
                $fields .= "`$key`";
                $placeholder .= ":$key";
            }
        }
        return "INSERT INTO {$this->_tablename} ($fields) VALUES ($placeholder)";
    }

    protected function update_query(array $data, string $where)
    {
        $new_values = "";
        foreach ($data as $key => $value) {
            if (in_array($key, $this->_fields)) {
                if ($new_values != "") {
                    $new_values .= ", ";
                }
                $new_values .= "`$key` = :$key";
            }
        }
        return "UPDATE {$this->_tablename} SET $new_values WHERE $where";
    }

    public function insert(array $data)
    {
        $sql = $this->insert_query($data);
        $st = $this->_conn->prepare($sql);
        try {
            if ($st->execute(TableBase::prepare_data($data))) {
                if ($this->_autoincrement != null) {
                    return $this->_conn->lastInsertId();
                }
                return true;
            }
            return false;
        }
        catch (PDOException $e) {
            $this->_errors->add($e->getMessage());
            return false;
        }
    }

    public function update(array $data, string $where)
    {
        // UPDATE table SET x = :x, y = :y WHERE x = :w_x
        $sql = $this->update_query($data, $where);
        $st = $this->_conn->prepare($sql);
        return $st->execute(TableBase::prepare_data($data));
    }

    public function delete(array $data) {
        try {
            $where = $this->where_clause($this->_fields, $data);
            $sql = "DELETE FROM {$this->_tablename} WHERE $where";
            $st = $this->_conn->prepare($sql);
            return $st->execute(TableBase::prepare_data($data));
        }
        catch (PDOException $e) {
            $this->_errors->add($e->getMessage());
            return false;
        }
    }

    function query_by_id(array $data_id)
    {
        $pk_vals = $this->extract_pk($this->_primary_key, $data_id);
        return $this->fetch_one(
            ['where' => $this->where_clause($this->_fields, $pk_vals)],
            $pk_vals
        );
    }

    function fetch_many(array $options = [], array $data = [])
    {
        $options['schema'] = $this->_tablename;
        $options['fields'] = $this->_fields;
        return parent::fetch_many($options, $data);
    }

    function fetch_one(array $options = [], array $data = [])
    {
        $options['schema'] = $this->_tablename;
        $options['fields'] = $this->_fields;
        return parent::fetch_one($options, $data);
    }
}
