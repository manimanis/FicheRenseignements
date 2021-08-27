/**
 * Return :
 * - 1  if str1 > str2
 * - -1 if str1 < str2
 * - 0  if str1 == str2 
 * @param {string} str1 
 * @param {string} str2 
 */
function stringCompare(str1, str2) {
  if (str1 > str2) return 1;
  if (str1 < str2) return -1;
  return 0;
}

/**
 * 
 * @param {Date} dt1 
 * @param {Date} dt2 
 * @returns 
 */
function dateCompare(dt1, dt2) {
  return dt1.getTime() - dt2.getTime();
}

function randomInt(a, b) {
  return a + Math.floor(Math.random() * (b - a + 1));
}

/**
 * 
 */
class Matiere {
  constructor(obj = {}) {
    this.id = +obj.id || 0;
    this.matiere = obj.matiere || "";
  }
}

/**
 * 
 */
class Section {
  constructor(obj = {}) {
    this.id = +obj.id || 0;
    this.section = obj.section || "";
    this.section_court = obj.section_court || "";
  }
}

/**
 * 
 */
class MatiereSection {
  constructor(obj = {}) {
    this.id_section = +obj.id_section || 0;
    this.id_matiere = +obj.id_matiere || 0;
    this.niveau = +obj.niveau || 1;
    this.categorie = obj.categorie || "OB";
    this.coef = +obj.coef || 1;
    this.matiere = obj.matiere || "";
    this.section = obj.section || "";
    this.section_court = obj.section_court || "";
  }

  defaultValues() {
    this.id_matiere = 0;
    this.matiere = "";
    this.categorie = "OB";
    this.coef = 1.0;
    return this;
  }
}

/**
 * 
 */
class NiveauSection {
  constructor(obj = {}) {
    this.niveau = +obj.niveau;
    this.section = obj.section;
  }

  isEqualTo(other) {
    return this.niveau === other.niveau && this.section === other.section;
  }

  toString() {
    return this.niveau + ((this.niveau == 1) ? 'ère' : 'ème') + ' ' +
      this.section;
  }
}

class Classe {
  constructor(obj = {}) {
    this.id_classe = +obj.id_classe || 0;
    this.id_section = +obj.id_section || 0;
    this.annee_scolaire = +obj.annee_scolaire || 2020;
    this.classe = obj.classe || "";
    this.niveau = +obj.niveau || 1;
    this.order = +obj.order || 1;
    this.section = obj.section || "";
    this.section_court = obj.section_court || "";
  }
}

/**
 * 
 */
class MatiereSectionCollection {
  constructor(items = []) {
    this.mat_sec = [];
    this.niv_sec = [];
    this.addMany(items);
  }

  /**
   * Recherche l'indice d'un niveau
   * @param {NiveauSection} item 
   * @returns 
   */
  indexOfNiveau(item) {
    return this.niv_sec
      .findIndex(ns => ns.isEqualTo(item));
  }

  /**
   * Recherche l'indice d'un niveau
   * @param {MatiereSection} item 
   * @returns 
   */
  findNiveau(item) {
    return this.indexOfNiveau(new NiveauSection(item));
  }

  /**
   * Ajouter un seul élément
   * @param {MatiereSection} item 
   * @returns 
   */
  add(item) {
    const nivSect = new NiveauSection(item);
    let idx = this.indexOfNiveau(nivSect);
    if (idx === -1) {
      idx = this.niv_sec.length;
      this.niv_sec.push(nivSect);
      this.mat_sec.push([]);
    }
    this.mat_sec[idx].push(item);
    return this;
  }

  /**
   * Ajouter plusieurs éléments
   * @param {MatiereSection[]} items 
   * @returns 
   */
  addMany(items) {
    for (let item of items) {
      this.add(item);
    }
    return this;
  }

  /**
   * Supprimer un élément à une position donnée
   * @param {number} idxNS 
   * @param {number} idxMS 
   * @returns Boolean
   */
  removeAt(idxNS, idxMS) {
    if (idxNS < 0 || idxNS >= this.mat_sec.length || idxMS < 0 || idxMS >= this.mat_sec[idxNS].length) {
      return false;
    }
    this.mat_sec[idxNS].splice(idxMS, 1);
    if (this.mat_sec[idxNS].length == 0) {
      this.mat_sec.splice(idxNS, 1);
      this.niv_sec.splice(idxNS, 1);
    }
    return true;
  }


  update(idxNS, idxMS, item) {
    const nivSect = new NiveauSection(item);
    let idx = this.indexOfNiveau(nivSect);
    if (idx == idxNS) {
      // l'élément est resté à sa place
      this.mat_sec[idxNS][idxMS] = item;
    } else {
      // l'élément a changé de niveau
      if (idx == -1) { // Nouveau niveau
        this.niv_sec.push(nivSect);
        this.mat_sec.push([item]);
      } else { // Ancien niveau
        this.mat_sec[idx].push(item);
      }
      this.removeAt(idxNS, idxMS);
    }
  }
}

/**
 * Une information élève
 */
class InfoEleve {
  constructor(obj = {}) {
    this.id = +obj.id || 0;
    this.id_eleve = +obj.id_eleve || 0;
    this.titre_info = obj.titre_info || "";
    this.date_ins = (obj.date_ins != null ? new Date(obj.date_ins) : new Date()).toISOString().substr(0, 19).replace('T', ' ');
    this.info = obj.info || "";
  }

  isEqualTo(other) {
    return this.id_eleve == other.id_eleve &&
      this.titre_info == other.titre_info &&
      this.info == other.info;
  }

  compareTo(other) {
    let cmp = stringCompare(this.titre_info, other.titre_info);
    if (cmp != 0) {
      return cmp;
    }
    cmp = dateCompare(this.date_ins, other.date_ins);
    if (cmp != 0) {
      return cmp;
    }
    return stringCompare(this.info, other.info);
  }
}

class InfoEleveCollection {
  constructor(items = []) {
    this.infos_eleves = [];
    this.addMany(items);
  }

  /**
   * Ajouter une information élève
   * 
   * @param {InfoEleve} item 
   */
  add(item) {
    this.infos_eleves.push(item);
    return this;
  }

  /**
   * Ajouter plusieurs InfoEleve
   * 
   * @param {InfoEleve[]} items 
   * @returns 
   */
  addMany(items) {
    for (let item of items) {
      this.add(item);
    }
    return this;
  }

  /**
   * Retourne tous les objects InfoEleve[]
   * @returns 
   */
  getAll() {
    return this.infos_eleves;
  }

  get(index) {
    return this.infos_eleves[index];
  }

  createIfNotExists(titre_info, info = "") {
    const idx = this.indexOfTitreInfo(titre_info);
    if (idx == -1) {
      this.add(new InfoEleve({
        titre_info: titre_info,
        date_ins: new Date().toISOString(),
        info: info
      }));
    }
    return this;
  }

  indexOfTitreInfo(titre_info) {
    return this.infos_eleves.findIndex(ie => ie.titre_info == titre_info);
  }

  /**
   * Retourne tous les enregistrements pour un titre info ti donné
   * @param {string} ti
   * @returns {InfoEleve[]}
   */
  getByTitreInfo(ti) {
    const idx = this.indexOfTitreInfo(ti);
    if (idx == -1) {
      return null;
    }
    return this.infos_eleves[idx];
  }

  setInfo(titre_info, info) {
    const ie = this.getByTitreInfo(titre_info);
    if (ie != null) {
      ie.info = info;
    }
    return this;
  }

  getInfo(titre_info) {
    const ie = this.getByTitreInfo(titre_info);
    if (ie != null) {
      return ie.info;
    }
    return null;
  }
}

/**
 * 
 */
class FicheRenseignement {
  constructor(obj = {}) {
    this.id_eleve = +obj.id_eleve || 0;
    this.nom_prenom = obj.nom_prenom || "";
    this.date_naiss = ((obj.date_naiss != null) ? new Date(obj.date_naiss) : new Date()).toISOString().substr(0, 10);
    this.genre = obj.genre || "";
    this.email = obj.email || "";
    this.annee_scolaire = +obj.annee_scolaire || this.currentAnneeScolaire();
    this.classe = new Classe(obj.classe);
    if (obj.other_infos) {
      this.other_infos = new InfoEleveCollection(obj.other_infos.infos_eleves.map(oi => new InfoEleve(oi)));
    } else {
      this.other_infos = new InfoEleveCollection([]);
    }
  }

  currentAnneeScolaire() {
    const dt = new Date();
    if ((dt.getMonth() + 1) < 9) {
      return dt.getFullYear() - 1;
    }
    return dt.getFullYear();
  }

  createInfo(titre_info, info = "") {
    this.other_infos.createIfNotExists(titre_info, info);
    return this;
  }
}