function deleteArticle(element) {
    const URL = 'http://localhost:3000/';
    const ARTICLE_QUERY = 'article/';
    let id = element.dataset.id;

    fetch(URL + ARTICLE_QUERY + id, { method: 'delete' })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
}
