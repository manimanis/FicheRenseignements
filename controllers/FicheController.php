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
        $tblEleve = new TableEleves();
        $req = $this->_controller->getRequest();
        if ($req['id_eleve'] == '0') {
            $eleve_data = [
                'nom_prenom' => $req['nom_prenom'],
                'date_naiss' => $req['date_naiss'],
                'genre' => $req['genre'],
                'email' => $req['email']
            ];
            $id = $tblEleve->insert($eleve_data);
            if ($id !== false) {
                $this->_response->addData('id_eleve', $id);

                $tblFiche = new TableFicheRenseignement();
                $fiche_data = [
                    'id_eleve' => $id,
                    'id_classe' => intval($req["id_classe"]),
                    'annee_scolaire' => intval($req["annee_scolaire"]),
                    'date_remp' => date('Y-m-d H:i:s'),
                    'remote_host' => $this->_controller->getRemote()
                ];
                $fiche_id = $tblFiche->insert($fiche_data);
                if ($fiche_id !== false) {
                    $this->_response->addData('id_fiche', $fiche_id);
                }

                $tblEleveClasse = new TableElevesClasses();
                $el_cl_data = [
                    'id_eleve' => $id,
                    'id_classe' => $fiche_data['id_classe'],
                    'annee_scolaire' => $fiche_data['annee_scolaire']
                ];
                $tblEleveClasse->insert($el_cl_data);

                $tblInfoEleve = new TableInfoEleve();
                $n = count($req['oi_id']);
                $ie_ids = [];
                for ($i = 0; $i < $n; $i++) {
                    $info_eleve = [
                        'id_eleve' => $id,
                        'titre_info' => $req['oi_titre_info'][$i],
                        'date_ins' => $req['oi_date_ins'][$i],
                        'info' => $req['oi_info'][$i],
                    ];
                    $ie_id = $tblInfoEleve->insert($info_eleve);
                    if ($ie_id !== false) {
                        $ie_ids[$info_eleve['titre_info']] = $ie_id;
                    } else {
                        $this->_response->addErrors($tblInfoEleve->getErrors()->getAll());
                    }
                }

                $this->_response->addData('info_eleve', $ie_ids);
            } else {
                $this->_response->addErrors($tblEleve->getErrors()->getAll());
            }
        }
        
        // $this->_response->addData('request', $req);
        $this->_response->write();
    }
}