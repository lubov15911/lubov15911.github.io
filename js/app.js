(function () {
    document.addEventListener("DOMContentLoaded", () => {
        let _currentFilter = null;
        let _currentPortal = null;

        function getCurrentFilter() {
            let buttons = document.getElementsByName('articleType');
            buttons.find = [].find;
            return buttons.find(item => item.checked);
        }

        function startSpinner() {
            // Start spinner
        }

        function stopSpinner() {

        }

        function clearArticles() {
            let articlesSection = document.getElementById('articleList');
            articlesSection.innerText = '';
        }

        function loadArticles(newsPortalId) {
            if (_currentPortal === newsPortalId && _currentFilter === getCurrentFilter()) {
                // There is nothing to update
                return;
            }

            startSpinner();

            _currentPortal = newsPortalId;
            _currentFilter = getCurrentFilter();

            getArticles(newsPortalId, _currentFilter.id)
                .then(data => {
                    stopSpinner();
                    let articlesSection = document.getElementById('articleList');
                    data.map(item => (new Article(item)).htmlElement)
                        .forEach(item => articlesSection.appendChild(item));
                }).catch(error => console.error('error', error));

        }


        getCurrentFilter();

        let aside = document.getElementById('aside');
        portals.map(item => (new PortalItem(item.title, item.newsId, item.logoUrl)).htmlElement)
            .forEach(item => aside.appendChild(item));

        aside.addEventListener('click', event => {
            let item = event.target.closest('div');
            if (!item || item.className === 'collapser') {
                return;
            }
            clearArticles();
            loadArticles(item.id);
        })

    });
})();

function togglePortalList() {
    let aside = document.getElementById('aside');
    aside.classList.toggle('collapsed');
}