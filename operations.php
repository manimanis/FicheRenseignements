<?php

require_once 'config.inc.php';

require_once 'inc/ErrorCollection.php';

require_once 'inc/DbConn.php';

require_once 'inc/DbBase.php';

require_once 'inc/TableBase.php';
require_once 'inc/TableEleves.php';
require_once 'inc/TableClasses.php';
require_once 'inc/TableSections.php';
require_once 'inc/TableMatieres.php';
require_once 'inc/TableMatieresSections.php';
require_once 'inc/TableElevesClasses.php';
require_once 'inc/TableInfoEleve.php';
require_once 'inc/TableFicheRenseignement.php';

require_once 'inc/ViewBase.php';
require_once 'inc/ViewClasses.php';
require_once 'inc/ViewElevesClasses.php';
require_once 'inc/ViewMatieresSections.php';

require_once 'inc/Response.php';

require_once 'inc/Controller.php';
require_once 'inc/ControllerBase.php';


Controller::getInstance()->run();
