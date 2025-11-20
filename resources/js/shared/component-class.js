export class ComponentClass {
    constructor(component) {
        this.component = component;
        this.classes = [`spire-${component}`];
        this.dataAttributes = {};
    }

    static make(component) {
        return new ComponentClass(component);
    }

    size(size) {
        if (size) {
            this.classes.push(`spire-${this.component}--${size}`);
            this.dataAttributes['data-spire-size'] = size;
        }
        return this;
    }

    variant(variant) {
        if (variant) {
            this.classes.push(`spire-${this.component}--${variant}`);
            this.dataAttributes['data-spire-variant'] = variant;
        }
        return this;
    }

    color(color) {
        if (color) {
            this.classes.push(`spire-${this.component}--${color}`);
            this.dataAttributes['data-spire-color'] = color;
        }
        return this;
    }

    colorVariant(color, variant) {
        if (color && variant) {
            this.classes.push(`spire-${this.component}--${color}-${variant}`);
            this.dataAttributes['data-spire-color'] = color;
            this.dataAttributes['data-spire-variant'] = variant;
        }
        return this;
    }

    modifier(modifier) {
        if (modifier) {
            this.classes.push(`spire-${this.component}--${modifier}`);
        }
        return this;
    }

    radius(radius) {
        if (radius) {
            this.classes.push(`rounded-${radius}`);
        }
        return this;
    }

    shadow(shadow) {
        if (shadow) {
            this.classes.push(`shadow-${shadow}`);
        }
        return this;
    }

    addClass(className) {
        if (className) {
            this.classes.push(className);
        }
        return this;
    }

    addClasses(...classes) {
        classes.forEach(className => {
            if (className) {
                this.classes.push(className);
            }
        });
        return this;
    }

    addIf(condition, className) {
        if (condition && className) {
            this.classes.push(className);
        }
        return this;
    }

    when(condition, callback) {
        if (condition && typeof callback === 'function') {
            callback(this);
        }
        return this;
    }

    dataAttribute(key, value) {
        if (key) {
            this.dataAttributes[`data-spire-${key}`] = value;
        }
        return this;
    }

    build() {
        return this.classes.join(' ');
    }

    toArray() {
        return [...this.classes];
    }

    getDataAttributes() {
        return { ...this.dataAttributes };
    }
}
