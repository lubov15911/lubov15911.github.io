const API_KEY = '0862223bc5834b99a8ab44f7ab2f375d';
const HTTPS_ADDRESS = 'https://newsapi.org/v2/';
const REQUEST_TYPE = {
    all: 'everything',
    headlines: 'top-headlines'
};
const RESPONSE_STATUS = {
    OK: 'ok',
    ERROR: 'error'
};

class RequestManager {
    static getUrl(newsPortalId, filter) {
        return `${HTTPS_ADDRESS + REQUEST_TYPE[filter]}?sources=${newsPortalId}&apiKey=${API_KEY}`;
    }

    static sendRequest(newsPortalId, filter) {
        return new Promise((resolve, reject) => {
            fetch(this.getUrl(newsPortalId, filter))
                .then(response => response.json())
                .then(data => data.status !== RESPONSE_STATUS.ERROR ? resolve(data.articles) : reject(error))
                .catch(error => reject(error));
        });
    }
}

class ArticlesManager {
    constructor(greetingElement, infoBox) {
        this.greetingElement = greetingElement;
        this.infoBox = infoBox;
    }

    /**
     * Get HTML Element of list of articles
     *
     * @returns {HTMLElement | null}
     */
    getArticleList() {
        return document.getElementById('articleList');
    }

    /**
     * Clear article list
     */
    clearArticles() {
        this.getArticleList().innerText = '';
    }

    /**
     * Show/hide loading information
     */
    toggleSpinner() {
        this.infoBox.classList.toggle('hide');
    }

    /**
     * Get chosen filter for articles (all/headlines)
     *
     * @returns {string}
     */
    getCurrentFilter() {
        let buttons = document.getElementsByName('articleType');
        buttons.find = [].find;
        return buttons.find(item => item.checked).id;
    }

    hideGreetingElement() {
        if (this.greetingElement) {
            this.greetingElement.classList.add('hide');
            this.greetingElement = null;
        }
    }

    loadArticles(currentPortal, currentFilter, newsPortalId, filter) {
        if (currentPortal === newsPortalId && (filter && filter === this.getCurrentFilter())) {
            // There is nothing to update
            return;
        }

        this.hideGreetingElement();
        this.clearArticles();
        this.toggleSpinner();

        currentPortal = newsPortalId;
        currentFilter = filter;

        RequestManager.sendRequest(newsPortalId, currentFilter)
            .then(data => {
                this.toggleSpinner();
                data.map(item => (new Article(item)).getHTMLElement)
                    .forEach(item => this.getArticleList().appendChild(item));
            }).catch(error => console.error('error', error));

        return [ currentPortal, currentFilter ];
    }
}