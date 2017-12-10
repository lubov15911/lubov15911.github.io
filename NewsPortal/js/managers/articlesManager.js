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

    loadStyles() {
        let links = document.querySelectorAll('head link');
        links.find = [].find;
        let articleStyles = links.find(element => element.getAttribute('href').includes('articles'));
        if (articleStyles) {
            // Styles are loaded
            return;
        }

        articleStyles = links[0].cloneNode();
        articleStyles.setAttribute('href', 'public/articles.css');
        document.getElementsByTagName('head')[0].appendChild(articleStyles);
    }

    loadArticles(currentPortal, currentFilter, newsPortalId, filter) {
        if (currentPortal === newsPortalId && (filter && filter === this.getCurrentFilter())) {
            // There is nothing to update
            return;
        }

        this.loadStyles();
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
