<?php
class TableSections extends TableBase
{
    protected string $_tablename = 'sections';
    protected array $_fields = ['id', 'section', 'section_court'];
    protected array $_primary_key = ['id'];
    protected string $_autoincrement = 'id';
}