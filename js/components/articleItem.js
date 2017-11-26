class Article {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.urlToImage = data.urlToImage;
        this.publishedAt = data.publishedAt;
        this.author = data.author;
    }

    get htmlElement() {
        // Header of an article
        let header = document.createElement('header');
        let title = document.createElement('h3');
        title.innerText = this.title;
        header.appendChild(title);

        // Main part of the article
        let body = document.createElement('main');
        let image = document.createElement('img');
        image.src = this.urlToImage;
        image.alt = this.title;
        body.appendChild(image);
        let description = document.createElement('p');
        description.innerText = this.description;
        body.appendChild(description);
        let linkToSource = document.createElement('a');
        linkToSource.href = this.url;
        linkToSource.innerText = 'Read more...';
        body.appendChild(linkToSource);

        // Footer of the article
        let footer = document.createElement('footer');
        let date = document.createElement('p');
        date.innerText = this.publishedAt;
        footer.appendChild(date);
        let author = document.createElement('p');
        author.innerText = `by ${this.author}.`;
        footer.appendChild(author);

        // Build article element
        let articleElement = document.createElement('article');
        articleElement.appendChild(header);
        articleElement.appendChild(body);
        articleElement.appendChild(footer);

        return articleElement;
    }
}