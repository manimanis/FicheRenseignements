<?php
class ViewMatieresSections extends ViewBase {
    protected string $_viewname = 'matieres_sections_view';
    protected array $_fields = [
        'id_section', 
        'id_matiere', 
        'niveau', 
        'categorie', 
        'coef', 
        'matiere', 
        'section', 
        'section_court'
    ];
    protected array $_tables = [
        'matieres_sections' => [
            'id_section' => 'id_section',
            'id_matiere' => 'id_matiere',
            'niveau' => 'niveau',
            'categorie' => 'categorie',
            'coef' => 'coef'
        ],
        'sections' => [
            'id_section' => 'id',
            'section' => 'section',
            'section_court' => 'section_court'
        ],
        'matieres' => [
            'id_matiere' => 'id',
            'matiere' => 'matiere'
        ]
    ];
}