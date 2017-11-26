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

function getUrl(newsPortalId, filter) {
    return `${HTTPS_ADDRESS + REQUEST_TYPE[filter]}?sources=${newsPortalId}&apiKey=${API_KEY}`;
}

function getArticles(newsPortalId, filter) {
    return new Promise((resolve, reject) => {
        console.warn(getUrl(newsPortalId, filter));
        fetch(getUrl(newsPortalId, filter))
            .then(response => response.json())
            .then(data => data.status !== RESPONSE_STATUS.ERROR ? resolve(data.articles) : reject(error))
            .catch(error => reject(error));
    });
}