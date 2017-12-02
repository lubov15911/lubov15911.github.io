class PortalItem {
    constructor(title, newsId, logoUrl) {
        this.title = title;
        this.id = newsId;
        this.logoUrl = logoUrl;
    }

    // Getters
    get getHTMLElement() {
        let item = document.createElement('div');
        item.id = this.id;
        item.appendChild(this.createImage());
        item.appendChild(this.createTitleElement());
        return item;
    }

    // Methods
    /**
     * Create image element for Portal Item
     *
     * @returns {HTMLImageElement}
     */
    createImage() {
        let image = document.createElement('img');
        image.src = this.logoUrl;
        image.alt = this.title;
        return image;
    }

    /**
     * Create title element for the portal item
     *
     * @returns {HTMLHeadingElement}
     */
    createTitleElement() {
        let title = document.createElement('h3');
        title.innerText = this.title;
        return title;
    }
}
