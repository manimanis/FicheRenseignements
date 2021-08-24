<?php
class TableMatieresSections extends TableBase
{
    protected string $_tablename = 'matieres_sections';
    protected array $_fields = ['id_section', 'id_matiere', 'niveau', 'categorie', 'coef'];
    protected array $_primary_key = ['id_section', 'id_matiere', 'niveau'];
    protected string $_autoincrement = '';
}