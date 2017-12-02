export default class Article {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.urlToImage = data.urlToImage;
        this.publishedAt = data.publishedAt;
        this.author = data.author;
    }

    // Getters
    get getHTMLElement() {
        // Build article element
        let articleElement = document.createElement('article');
        articleElement.appendChild(this.createHeader());
        articleElement.appendChild(this.createBody());
        articleElement.appendChild(this.createFooter());

        return articleElement;
    }

    // Methods
    /**
     * Create header element of an article
     *
     * @returns {HTMLElement}
     */
    createHeader() {
        let header = document.createElement('header');
        let title = document.createElement('h2');
        title.innerText = this.title;
        header.appendChild(title);
        return header;
    }

    /**
     * Create image element for article
     *
     * @returns {HTMLImageElement}
     */
    createImage() {
        let image = document.createElement('img');
        image.src = this.urlToImage;
        image.alt = this.title;
        return image;
    }

    /**
     * Create paragraph element for the article
     *
     * @param {String} text String which we need to display in the paragraph
     * @returns {HTMLParagraphElement}
     */
    createParagraph(text) {
        let paragraph = document.createElement('p');
        paragraph.innerText = text;
        return paragraph;
    }

    /**
     * Create link to origin source
     *
     * @returns {HTMLAnchorElement}
     */
    createLinkToSource() {
        let linkToSource = document.createElement('a');
        linkToSource.href = this.url;
        linkToSource.target = '_blank';
        linkToSource.innerText = 'Read more...';
        return linkToSource;
    }

    /**
     * Create main part of the article
     *
     * @returns {HTMLElement}
     */
    createBody() {
        let body = document.createElement('main');
        body.appendChild(this.createImage());
        body.appendChild(this.createParagraph(this.description));
        body.appendChild(this.createLinkToSource());
        return body;
    }

    /**
     * Create footer element of the article
     *
     * @returns {HTMLElement}
     */
    createFooter() {
        let footer = document.createElement('footer');
        let time = new Date(Date.parse(this.publishedAt));
        footer.appendChild(this.createParagraph(`${time.toLocaleDateString()}, ${time.toLocaleTimeString()}`));
        footer.appendChild(this.createParagraph(`by ${this.author}.`));
        return footer;
    }
}