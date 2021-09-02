<?php
class UserController extends ControllerBase
{
    public function loginAction()
    {
        if (!$this->isPOST()) {
            $this->addError("Opération non supportée!");
            $this->write();
            return;
        }
        $req = $this->getRequest();
        $tblUsers = new TableUsers();

        $user = $tblUsers->isValidLogin($req['pseudo'], $req['pass']);
        if (!$user) {
            $this->addError("Login/Mot de passe incorrects!");
        } else {
            $tblEleves = new TableEleves();
            $eleve = $tblEleves->query_by_id([$user['id_eleve']]);

            $jwt = new JWTUtils();
            $token = $jwt->createToken([
                'user' => $user['pseudo'],
                'role' => $user['role']
            ]);
            
            $this->addData('token', $token);
            $this->addData('eleve', $eleve);
        }
        $this->write();
    }
}
