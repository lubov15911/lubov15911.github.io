import portals from './db/newsPortals.json';
import PortalItem from './components/portalItem';
import {
    NOTIFICATION_TYPE,
    Notification as NotificationItem
} from './components/notificationItem';

(function () {
    const DEACTIVATE_TIMEOUT = 30000;   // 30 sec
    const REINSTATE_TIMEOUT = 30000;    // 30 sec
    const REMOVE_TIMEOUT = 20000;       // 20 sec
    const NOTIFICATION_TIMEOUT = 5000;  // 10 sec

    document.addEventListener("DOMContentLoaded", () => {
        // Local variables
        let articleManager;
        let aside = document.getElementById('aside');
        let currentFilter = 'all';
        let currentPortal = null;
        let portalsArray = [];

        function executeCommand(command, portals) {
            if (!portals) { return; }

            portals.forEach(item => {
                portalsArray[item].execute(command)
            });
        }

        function displayNotification(type, text) {
            let error = new NotificationItem(type, text);
            error.setTimer = NOTIFICATION_TIMEOUT;
            error.showNotification();
        }

        portals.map(item => {
            let portal = new PortalItem(item.title, item.newsId, item.logoUrl);
            portalsArray.push(portal);
            return portal.getHTMLElement;
        }).forEach(item => aside.appendChild(item));

        aside.addEventListener('click', event => {
            let item = event.target.closest('div');
            if (!item || item.className === 'collapser') {
                return;
            }
            (window.innerWidth <= 568) && togglePortalList();

            if (item.classList.contains('deactivated')) {
                // We can't load articles from deactivated portal
                displayNotification(NOTIFICATION_TYPE.error, 'Portal is temporarily unavailable');
                return;
            }

            if (!articleManager) {
                import('./managers/articlesManager').then(module => {
                    // lazy.
                    const ArticlesManager = module.default;
                    articleManager = ArticlesManager.getInstance(document.querySelector('.greeting'), document.querySelector('.loading'));

                    [currentPortal, currentFilter] =
                        articleManager.loadArticles(currentPortal, currentFilter, item.id, currentFilter);
                });
            } else {
                [currentPortal, currentFilter] =
                    articleManager.loadArticles(currentPortal, currentFilter, item.id, currentFilter);
            }
        });

        document.getElementsByTagName('nav')[0].addEventListener('click', event => {
            let item = event.target.closest('label');
            if (!item || !currentPortal) {
                return;
            }

            if (!articleManager) {
                import('./managers/articlesManager').then(module => {
                    const ArticlesManager = module.default;
                    articleManager = ArticlesManager.getInstance(document.querySelector('.greeting'), document.querySelector('.loading'));

                    [currentPortal, currentFilter] =
                        articleManager.loadArticles(currentPortal, currentFilter, currentPortal, item.getAttribute('for'));
                });
            } else {
                [currentPortal, currentFilter] =
                    articleManager.loadArticles(currentPortal, currentFilter, currentPortal, item.getAttribute('for'));
            }
        });

        /**
         * The following part is presented as example of using Command Pattern
         *
         * Instead of timeouts we can use different requests from appropriate portals
         * and according to the request we can suspend/reinstate
         * or remove portals from the list on the left side of web-site.
         */

        // For example, we can receive a request that some portals are disabled,
        // in this case we can deactivate them (make them non-clickable)
        setTimeout(() => {
            // TODO: In future we should use portal IDs (E.g. IDs can be gotten in request)
            executeCommand('toggleSuspendedState', [2, 5, 6]);
            displayNotification(NOTIFICATION_TYPE.info, 'Some portals were suspended');

            // Similar situation: we can receive a request that some portals are reinstated
            setTimeout(() => {
                // TODO: In future we should use portal IDs (E.g. IDs can be gotten in request)
                executeCommand('toggleSuspendedState', [2, 6]);
            }, REINSTATE_TIMEOUT);

        }, DEACTIVATE_TIMEOUT);

        // Case when we need to remove portal from suggested list
        setTimeout(() => {
            // TODO: In future we should use portal IDs. And remove portals from array by ID
            // Right now this method is not correct, but the one is showed for example
            [0, 1].forEach(item => {
                portalsArray.splice(item, 1);
            });
            executeCommand('remove', [0, 1]);
            displayNotification(NOTIFICATION_TYPE.warning, 'Some portals were removed from your list');
        }, REMOVE_TIMEOUT);
    });
})();

function togglePortalList() {
    let aside = document.getElementById('aside');
    aside.classList.toggle('collapsed');
}
