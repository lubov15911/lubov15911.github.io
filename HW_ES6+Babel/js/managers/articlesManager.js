import RequestManager from './requestManager';
import Article from '../components/articleItem';

export default class ArticlesManager {
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