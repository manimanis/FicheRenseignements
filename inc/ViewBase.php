<?php
class ViewBase extends DbBase {
    protected string $_viewname = '';
    protected array $_fields = [];
    protected array $_tables = [];

    function fetch_many(array $options = [], array $data = [])
    {
        $options['schema'] = $this->_viewname;
        $options['fields'] = $this->_fields;
        return parent::fetch_many($options, $data);
    }

    function fetch_one(array $options = [], array $data = [])
    {
        $options['schema'] = $this->_viewname;
        $options['fields'] = $this->_fields;
        return parent::fetch_one($options, $data);
    }
}