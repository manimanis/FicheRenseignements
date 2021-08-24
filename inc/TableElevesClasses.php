<?php
class TableElevesClasses extends TableBase
{
    protected string $_tablename = 'eleves_classes';
    protected array $_fields = ['id_eleve', 'id_classe', 'annee_scolaire'];
    protected array $_primary_key = ['id_eleve', 'id_classe', 'annee_scolaire'];
    protected string $_autoincrement = '';
}