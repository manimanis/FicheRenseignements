<?php
class TableMatieres extends TableBase
{
    protected string $_tablename = 'matieres';
    protected array $_fields = ['id', 'matiere'];
    protected array $_primary_key = ['id'];
    protected string $_autoincrement = 'id';
}