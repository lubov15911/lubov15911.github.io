/**
 * Decorator pattern (for DOM Elements)
 * [structural]
 */
class Decorator {
    for(element) {
        this.element = element;
        return this;
    }

    applyText(text) {
        this.element.innerText = text;
        return this;
    }

    applyLink(link) {
        this.element.href = link;
        return this;
    }

    applyTarget(target) {
        this.element.target = target;
        return this;
    }
}

let DecoratorSingleton = (() => {
    let singleton;
    return {
        getInstance() {
            !singleton && (singleton = new Decorator());
            return singleton;
        }
    }
})();

export default DecoratorSingleton;
