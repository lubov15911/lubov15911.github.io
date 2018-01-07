import Image from './imageItem';
import DecoratorSingleton from './decorator';
import ObserverList from './../managers/observer';
import { NOTIFICATION_TYPE } from './notificationItem';

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

        this.observers = new ObserverList();
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
        let elementClasses = document.getElementById(this.id).classList;
        elementClasses.toggle('deactivated');
        this.notify(NOTIFICATION_TYPE.info, elementClasses.contains('deactivated'));
        this.notify(NOTIFICATION_TYPE.error, false);
    }

    remove() {
        this.element.remove();
        this.notify(NOTIFICATION_TYPE.warning, true)
    }

    addObservers(observers) {
        observers.forEach(observer => {
            this.observers.add(observer);
        });
    }

    removeObserver(observer) {
        this.observers.removeAt(this.observers.indexOf(observer, 0))
    }

    notify(type, context) {
        let observerLength = this.observers.getLength;
        for (let i = 0; i < observerLength; i++) {
            let notification = this.observers.get(i);
            notification.type === type && notification.update(context);
        }
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
