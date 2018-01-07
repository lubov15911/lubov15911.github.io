import DecoratorSingleton from './decorator';

let Decorator = DecoratorSingleton.getInstance();

const NOTIFICATION_TYPE = {
    error: 'error',
    warning: 'warning',
    info: 'info'
};

class Notification {
    constructor(type, message) {
        this.type = type ? type : NOTIFICATION_TYPE.info;
        this.message = this.type.toUpperCase() + (message ? `: ${message}.` : '');
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

    showNotification() {
        !this.element && this.createElement();
        document.body.appendChild(this.element);
        this.startTimer()
    }
}

export {
    NOTIFICATION_TYPE,
    Notification
}