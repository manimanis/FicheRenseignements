<?php
class FicheController extends ControllerBase {
    public function listeClassesAction()
    {
        $view_classes = new ViewClasses();
        $classes = $view_classes->fetch_many([
            "where" => "annee_scolaire = :annee_scolaire"
        ], [
            'annee_scolaire' => $this->_controller->getRequest()['annee_scolaire']
        ]);
        $this->_response->addData('classes', $classes);
        $this->_response->write();
    }

    public function insertNewAction() {
        if (!$this->_controller->isPOST()) {
            $this->_response->addError("Opération non supportée!");
            $this->_response->write();
            return;
        }
        $req = $this->_controller->getRequest();
        $this->_response->addData('request', $req);
        $this->_response->write();
    }
}