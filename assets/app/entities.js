class Matiere {
  constructor(obj = {}) {
    this.id = +obj.id || 0;
    this.matiere = obj.matiere || "";
  }
}

class Section {
  constructor(obj = {}) {
    this.id = +obj.id || 0;
    this.section = obj.section || "";
    this.section_court = obj.section_court || "";
  }
}

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