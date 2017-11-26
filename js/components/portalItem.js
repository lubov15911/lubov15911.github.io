class PortalItem {
    constructor(title, newsId, logoUrl) {
        this.title = title;
        this.id = newsId;
        this.logoUrl = logoUrl;
    }

    get htmlElement() {
        let item = document.createElement('div');
        item.id = this.id;

        let image = document.createElement('img');
        image.src = this.logoUrl;
        image.alt = this.title;

        let title = document.createElement('h4');
        title.innerText = this.title;

        item.appendChild(image);
        item.appendChild(title);
        return item;
    }
}
