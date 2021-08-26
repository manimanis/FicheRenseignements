<?php
class TableInfoEleve extends TableBase
{
    protected string $_tablename = 'infos_eleves';
    protected array $_fields = ['id', 'id_eleve', 'id_classe', 'annee_scolaire', 'date_remp', 'remote_host'];
    protected array $_primary_key = ['id'];
    protected string $_autoincrement = 'id';
}