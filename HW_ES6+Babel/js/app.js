import portals from './db/newsPortals';
import PortalItem from './components/portalItem';
import ArticlesManager from './managers/articlesManager';

(function () {
    document.addEventListener("DOMContentLoaded", () => {
        // Local variables
        let articleManager = new ArticlesManager(document.querySelector('.greeting'), document.querySelector('.loading'));
        let aside = document.getElementById('aside');
        let currentFilter = 'all';
        let currentPortal = null;

        portals.map(item => (new PortalItem(item.title, item.newsId, item.logoUrl)).getHTMLElement)
            .forEach(item => aside.appendChild(item));

        aside.addEventListener('click', event => {
            let item = event.target.closest('div');
            if (!item || item.className === 'collapser') {
                return;
            }
            (window.innerWidth <= 568) && togglePortalList();
            [currentPortal, currentFilter] =
                articleManager.loadArticles(currentPortal, currentFilter, item.id, currentFilter);
        });

        document.getElementsByTagName('nav')[0].addEventListener('click', event => {
            let item = event.target.closest('label');
            if (!item) {
                return;
            }
            [currentPortal, currentFilter] =
                articleManager.loadArticles(currentPortal, currentFilter, currentPortal, item.getAttribute('for'));
        });
    });
})();

function togglePortalList() {
    let aside = document.getElementById('aside');
    aside.classList.toggle('collapsed');
}
