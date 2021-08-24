<?php

class IndexController extends ControllerBase
{
    public function indexAction()
    {
        $this->_response->addData('method', $this->_controller->getMethod());
        $this->_response->addData('request', $this->_controller->getRequest());
        $this->_response->addData('controllerName', $this->_controller->getControllerName());
        $this->_response->addData('actionName', $this->_controller->getActionName());

        $this->_response->write();
    }
}
