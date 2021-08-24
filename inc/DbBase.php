<?php

class DbBase
{
    protected PDO $_conn;
    protected ErrorCollection $_errors;

    public function __construct()
    {
        $this->_conn = DbConn::getInstance();
        $this->_errors = new ErrorCollection();
    }

    public function getErrors() {
        return $this->_errors;
    }

    public static function prepare_data(array $data, string $prefix = "")
    {
        $prep = [];
        foreach ($data as $key => $value) {
            if ($key != '') {
                if ($key[0] != ':') {
                    $key = ':' . $prefix . $key;
                }
                $prep[$key] = $value;
            }
        }
        return $prep;
    }

    public static function extract_pk(array $pk_fields, array $data)
    {
        $pk_vals = [];
        foreach ($pk_fields as $idx => $pk) {
            $pk_vals[$pk] = $data[$idx];
        }
        return $pk_vals;
    }

    public static function where_clause(array $fields, array $data, string $glue = " AND ")
    {
        $where = "";
        foreach ($data as $key => $value) {
            if (in_array($key, $fields)) {
                if ($where != "") {
                    $where .= $glue;
                }
                $where .= "`$key` = :$key";
            }
        }
        return $where;
    }

    public function query_many(string $sql, array $params = [])
    {
        $st = $this->_conn->prepare($sql);
        $st->execute(DbBase::prepare_data($params));
        return $st->fetchAll(PDO::FETCH_ASSOC);
    }

    function query_one(string $sql, array $params = [])
    {
        $st = $this->_conn->prepare($sql);
        $st->execute(DbBase::prepare_data($params));
        return $st->fetch(PDO::FETCH_ASSOC);
    }

    function fetch_many(array $options = [], array $data = [])
    {
        $sql = $this->select($options);
        return $this->query_many($sql, $data);
    }

    function fetch_one(array $options = [], array $data = [])
    {
        $sql = $this->select($options);
        return $this->query_one($sql, $data);
    }

    /**
     * Build a SELECT ... FROM ... SQL query based on passed options in the array
     * The supported fields are :
     * * (array) fields names 
     * * (string) schema name
     * * (string) where clause
     * * (string) group by clause
     * * (string) order by clause
     * 
     * @param array $options
     * @return string The SQL Query
     */
    public function select(array $options)
    {
        $fields = (!key_exists('fields', $options)) ? '*' : "`" . implode('`, `', $options['fields']) . "`";
        $schema = $options['schema'];
        $sql = "SELECT $fields FROM $schema";
        if (key_exists('where', $options)) {
            $sql .= " WHERE {$options['where']}";
        }
        if (key_exists('groupby', $options)) {
            $sql .= " GROUP BY {$options['groupby']}";
        }
        if (key_exists('orderby', $options)) {
            $sql .= " ORDER BY {$options['orderby']}";
        }
        if (key_exists('limit', $options)) {
            $sql .= " LIMIT {$options['limit']['count']} OFFSET {$options['limit']['offset']}";
        }
        return $sql;
    }
}
