<?php
class ViewClasses extends ViewBase {
    protected string $_viewname = 'classes_view';
    protected array $_fields = [
        'id_classe', 
        'id_section', 
        'annee_scolaire', 
        'classe', 
        'niveau', 
        'order', 
        'section', 
        'section_court'
    ];
    protected array $_tables = [
        'classes' => [
            'id_classe' => 'id',
            'annee_scolaire' => 'annee_scolaire',
            'niveau' => 'niveau',
            'id_section' => 'id_section',
            'order' => 'order'
        ],
        'sections' => [
            'id_section' => 'id',
            'section' => 'section',
            'section_court' => 'section_court'
        ]
    ];
}