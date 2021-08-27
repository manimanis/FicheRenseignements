class FormValidator {
    constructor() {
        this.validators = [];
    }

    addValidator(elemValidator) {
        this.validators.push(validator);
        return this;
    }

    validate() {
        let isValid = true;
        for (let validator of this.validators) {
            if (!validator.validate()) {
                isValid = false;
            }
        }
        return isValid;
    }
}

class ElementValidator {
    constructor(htmlElem) {
        this.htmlElem = document.querySelector(htmlElem);
        this.validators = [];
    }

    addValidator(validator) {
        this.validators.push(validator);
        return this;
    }

    validate() {
        const value = this.htmlElem.value;
        for (let validator in this.validators) {
            if (!validator.isValid(value)) {
                this.htmlElem.validity.valid = false;
                return false;
            }
        }
        this.htmlElem.validity.valid = true;
        return true;
    }
}

class DateValidator {
    constructor(after, before) {
        this.after = new Date(after);
        this.before = new Date(before);
    }
    
    isValid(value) {
        const val = new Date(value)
        return (val.getTime() >= this.after.getTime() && val.getTime() <= this.before.getTime());
    }
}