import Image from './imageItem';
import DecoratorSingleton from './decorator';

let Decorator = DecoratorSingleton.getInstance();

/**
 * This is also an example of a Factory pattern
 * [creational]
 */
class PortalItem {
    constructor(title, newsId, logoUrl) {
        this.element = document.createElement('div');
        this.title = title;
        this.id = newsId;
        this.logoUrl = logoUrl;
    }

    // Getters
    get getHTMLElement() {
        this.element.id = this.id;
        this.element.appendChild(Image(this.logoUrl, this.title).getHTMLElement());
        this.element.appendChild(this.createTitleElement());
        return this.element;
    }

    // Methods
    /**
     * Create title element for the portal item
     *
     * @returns {HTMLHeadingElement}
     */
    createTitleElement() {
        let title = document.createElement('h3');
        Decorator.for(title).applyText(this.title);
        return title;
    }

    toggleSuspendedState() {
        document.getElementById(this.id).classList.toggle('deactivated');
    }

    remove() {
        this.element.remove();
    }

    /**
     * Command pattern
     * [behavioral]
     */
    execute(command) {
        this[command]();
    }
}

export default PortalItem;
