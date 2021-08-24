<?php
class TableClasses extends TableBase
{
    protected string $_tablename = 'classes';
    protected array $_fields = ['id', 'annee_scolaire', 'niveau', 'id_section', 'order'];
    protected array $_primary_key = ['id'];
    protected string $_autoincrement = 'id';
}