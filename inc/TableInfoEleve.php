<?php
class TableInfoEleve extends TableBase
{
    protected string $_tablename = 'infos_eleves';
    protected array $_fields = ['id', 'id_eleve', 'titre_info', 'date_ins', 'info'];
    protected array $_primary_key = ['id'];
    protected string $_autoincrement = 'id';
}