<?php

class ControllerBase
{
    protected Controller $_controller;
    protected Response $_response;

    function __construct() {
        $this->_controller = Controller::getInstance();
        $this->_response = new Response();
    }
}
