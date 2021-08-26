<?php
class TableFicheRenseignement extends TableBase
{
    protected string $_tablename = 'fiches_renseignements';
    protected array $_fields = ['id', 'id_eleve', 'id_classe', 'annee_scolaire', 'date_remp', 'remote_host'];
    protected array $_primary_key = ['id'];
    protected string $_autoincrement = 'id';
}