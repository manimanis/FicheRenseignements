<?php
class ClassesController extends ControllerBase
{
    public function indexAction()
    {
        $view_classes = new ViewClasses();
        $classes = $view_classes->fetch_many();
        $this->_response->addData('classes', $classes);
        $this->_response->write();
    }

    public function matieresSectionsAction()
    {
        $vwMatSec = new ViewMatieresSections();
        $tblSections = new TableSections();
        $tblMatieres = new TableMatieres();

        $matieres_sections = $vwMatSec->fetch_many([
            'orderby' => 'niveau ASC, section ASC, categorie ASC, matiere ASC'
        ]);
        $sections = $tblSections->fetch_many(['orderby' => 'section ASC']);
        $matieres = $tblMatieres->fetch_many(['orderby' => 'matiere ASC']);

        $this->_response->addData('matieres_sections', $matieres_sections);
        $this->_response->addData('matieres', $matieres);
        $this->_response->addData('sections', $sections);
        $this->_response->write();
    }

    public function insertMatiereAction()
    {
        if (!$this->_controller->isPOST()) {
            $this->_response->addError("Opération non supportée!");
            $this->_response->write();
            return;
        }
        $req = $this->_controller->getRequest();
        $data = [
            'id_section' => $req['id_section'],
            'id_matiere' => $req['id_matiere'],
            'niveau' => $req['niveau'],
            'categorie' => $req['categorie'],
            'coef' => $req['coef']
        ];
        $tblMatSect = new TableMatieresSections();
        if ($tblMatSect->insert($data) === true) {
            $ms = $tblMatSect->query_by_id([
                $req['id_section'],
                $req['id_matiere'],
                $req['niveau']
            ]);
            $this->_response->addData('matiere_section', $ms);
        } else {
            $this->_response->addErrors($tblMatSect->getErrors()->getAll());
        }
        $this->_response->write();
    }

    public function insertManyMatieresAction() {
        if (!$this->_controller->isPOST()) {
            $this->_response->addError("Opération non supportée!");
            $this->_response->write();
            return;
        }
        $req = $this->_controller->getRequest();
        $tblMatSect = new TableMatieresSections();
        $count = count($req['id_section']);
        for ($i = 0; $i < $count; $i++) {
            $data = [
                'id_section' => $req['id_section'][$i],
                'id_matiere' => $req['id_matiere'][$i],
                'niveau' => $req['niveau'][$i],
                'categorie' => $req['categorie'][$i],
                'coef' => $req['coef'][$i]
            ];
            if ($tblMatSect->insert($data) === true) {
                $ms = $tblMatSect->query_by_id([
                    $data['id_section'],
                    $data['id_matiere'],
                    $data['niveau']
                ]);
                $this->_response->addData('matiere_section'.$i, $ms);
            } else {
                $this->_response->addErrors($tblMatSect->getErrors()->getAll());
            }
        }
        $this->_response->write();
    }

    public function updateMatiereAction()
    {
        if (!$this->_controller->isPOST()) {
            $this->_response->addError("Opération non supportée!");
            $this->_response->write();
            return;
        }
        $req = $this->_controller->getRequest();
        $data = [
            'id_section' => $req['id_section'],
            'id_matiere' => $req['id_matiere'],
            'niveau' => $req['niveau'],
            'categorie' => $req['categorie'],
            'coef' => $req['coef'],
            'oid_section' => $req['oid_section'],
            'oid_matiere' => $req['oid_matiere'],
            'oniveau' => $req['oniveau']
        ];
        $tblMatSect = new TableMatieresSections();
        if ($tblMatSect->update($data, "id_section = :oid_section AND id_matiere = :oid_matiere AND niveau = :oniveau") === true) {
            $ms = $tblMatSect->query_by_id([
                $req['id_section'],
                $req['id_matiere'],
                $req['niveau']
            ]);
            $this->_response->addData('matiere_section', $ms);
        } else {
            $this->_response->addErrors($tblMatSect->getErrors()->getAll());
        }
        $this->_response->write();
    }

    public function deleteMatiereAction()
    {
        if (!$this->_controller->isPOST()) {
            $this->_response->addError("Opération non supportée!");
            $this->_response->write();
            return;
        }
        $req = $this->_controller->getRequest();
        $data = [
            'id_section' => $req['id_section'],
            'id_matiere' => $req['id_matiere'],
            'niveau' => $req['niveau'],
        ];
        $tblMatSect = new TableMatieresSections();
        $ms = $tblMatSect->query_by_id([
            $req['id_section'],
            $req['id_matiere'],
            $req['niveau']
        ]);
        if ($ms) {
            if ($tblMatSect->delete($data) === true) {
                $this->_response->addData('matiere_section', $ms);
            } else {
                $this->_response->addErrors($tblMatSect->getErrors()->getAll());
            }
        } else {
            $this->_response->addError("Impossible d'effectuer la supprimer l'enregistrement est introuvable!");
        }
        $this->_response->write();
    }
}
