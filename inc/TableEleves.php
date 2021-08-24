<?php
class TableEleves extends TableBase
{
    protected string $_tablename = 'eleves';
    protected array $_fields = ['id', 'nom_prenom', 'date_naiss', 'genre', 'email', 'passe_temps'];
    protected array $_primary_key = ['id'];
    protected string $_autoincrement = 'id';
}
