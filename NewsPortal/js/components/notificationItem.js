import DecoratorSingleton from './decorator';

let Decorator = DecoratorSingleton.getInstance();

const NOTIFICATION_TYPE = {
    error: 'error',
    warning: 'warning',
    info: 'info'
};
const NOTIFICATION_TIMEOUT = 5000;  // 5 sec

class Notification {
    constructor(type, message, timer) {
        this.type = type ? type : NOTIFICATION_TYPE.info;
        this.message = this.type.toUpperCase() + (message ? `: ${message}.` : '');
        timer && (this.timer = timer);
    }

    // Setters
    set setTimer(value) {
        this.timer = value;
    }

    /**
     * Create paragraph element for the article
     *
     * @param {String} text String which we need to display in the paragraph
     * @returns {HTMLParagraphElement}
     */
    createParagraph(text) {
        let paragraph = document.createElement('p');
        Decorator.for(paragraph).applyText(text);
        return paragraph;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('notification');
        this.element.classList.add(`notification-${this.type}`);
        this.element.appendChild(this.createParagraph(this.message));
    }

    startTimer() {
        if (!this.timer) {
            // There is no timer to start
            return;
        }

        setTimeout(() => {
            this.element.remove();
        }, this.timer);
    }

    update(status) {
        status ? this.showNotification() : this.hideNotification();
    }

    showNotification() {
        !this.element && this.createElement();
        document.body.appendChild(this.element);
        this.startTimer()
    }

    hideNotification() {
        if (!this.element) { return; }

        this.element.remove();
    }
}

const NotificationsArray = [
    new Notification(NOTIFICATION_TYPE.error, 'Portal is temporarily unavailable', NOTIFICATION_TIMEOUT),
    new Notification(NOTIFICATION_TYPE.warning, 'Some portals were removed from your list', NOTIFICATION_TIMEOUT),
    new Notification(NOTIFICATION_TYPE.info, 'Some portals were suspended', NOTIFICATION_TIMEOUT)
];

export {
    NOTIFICATION_TYPE,
    NotificationsArray
}
