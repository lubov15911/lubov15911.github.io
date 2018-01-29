console.log('Hey you :)');

document.addEventListener('click', (event) => {
    if (!event.target.dataset.type) {
        return;
    }

    let dataType = event.target.dataset.type;
    switch (dataType) {
        case 'delete':
            fetch('http://localhost:3000/article/' + event.target.dataset.id, { method: 'DELETE' })
                .then((response) => console.log(response))
                .catch((error) => console.error(error));
            break;
        case 'create':
            // TODO: for test. In future we should take this object from client forms
            let body = {
                _id: 1236548975534,
                commentsRestricted: false,
                picture: "http://placehold.it/32x32",
                author: "Knapp Schmidt",
                company: "COWTOWN",
                email: "knappschmidt@cowtown.com",
                articleTitle: "consectetur",
                articleBody: "Id in velit pariatur sunt pariatur laboris. Nisi cupidatat quis dolore ex cupidatat quis aliqua nisi veniam. Exercitation voluptate sint Lorem exercitation laboris aute culpa tempor reprehenderit sint. Dolore adipisicing sit est anim ullamco tempor anim ullamco. Exercitation non ullamco laborum irure officia. Anim minim cillum voluptate aliqua exercitation do do veniam quis culpa tempor nostrud. Commodo occaecat laborum reprehenderit amet labore proident tempor minim et sint ad laborum reprehenderit.\r\n",
                published: "2014-03-16T01:57:51 -03:00"
            };
            fetch('http://localhost:3000/article/' + body._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then((response) => console.log(response))
                .catch((error) => console.error(error));
            break;
        default:
            return;
    }


});
