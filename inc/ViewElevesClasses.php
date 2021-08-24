<?php
class ViewElevesClasses extends ViewBase {
    protected string $_viewname = 'eleves_classes_view';
    protected array $_fields = [
        'id_eleve', 
        'id_classe', 
        'id_section', 
        'annee_scolaire', 
        'niveau', 
        'order', 
        'nom_prenom', 
        'date_naiss', 
        'genre', 
        'email', 
        'passe_temps', 
        'section', 
        'section_court', 
        'classe'
    ];
    protected array $_tables = [
        'eleves_classes' => [
            'id_eleve' => 'id_eleve',
            'id_classse' => 'id_classe',
            'annee_scolaire' => 'annee_scolaire'
        ],
        'eleves' => [
            'id_eleve' => 'id',
            'nom_prenom' => 'nom_prenom',
            'date_naiss' => 'date_naiss',
            'genre' => 'genre',
            'email' => 'email',
            'passe_temps' => 'passe_temps'
        ],
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