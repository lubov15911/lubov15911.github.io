const mongoose = require('mongoose');
mongoose.connect(require('./config').url);
const Article = require('./models/article');

let articlesDB = [
    {
        _id: "5a6e3583c88d5717bf43b135",
        author: "Toni Head",
        email: "tonihead@zorromop.com",
        title: "do",
        body: "Sint mollit deserunt voluptate est velit exercitation irure ea. Occaecat esse velit dolor nostrud cupidatat adipisicing eiusmod. Qui nulla enim sunt minim laborum dolor aliqua voluptate minim.\r\n"
    },
    {
        _id: "5a6e3583c6927ff9c435a555",
        author: "Mcguire Ingram",
        email: "mcguireingram@flyboyz.com",
        title: "in",
        body: "Laborum est ullamco voluptate adipisicing quis cillum nisi aliqua aliquip cillum nisi. Duis enim anim consequat sit ea tempor labore pariatur eiusmod culpa in id. Lorem laboris laborum mollit aliquip adipisicing. Sit amet excepteur tempor non velit ex quis et id elit. Aute labore enim deserunt dolor enim veniam veniam ea Lorem.\r\n"
    },
    {
        _id: "5a6e35838fcc7864fadf11a7",
        author: "Darcy Roberson",
        email: "darcyroberson@farmage.com",
        title: "incididunt",
        body: "Duis qui laborum dolore cillum. Laboris ad pariatur fugiat minim. Elit qui veniam non nulla laboris qui aliquip irure aute. Fugiat aliqua nisi esse est nisi ut laboris sint dolor eu occaecat Lorem.\r\n"
    },
    {
        _id: "5a6e35839387068c0df003ca",
        author: "Nita Richmond",
        email: "nitarichmond@sybixtex.com",
        title: "irure",
        body: "Commodo sunt magna quis ipsum fugiat ea id officia. Esse duis ea culpa sunt commodo dolor aliqua eiusmod nisi ea. Ipsum cupidatat consectetur sunt voluptate pariatur veniam non mollit. Laboris voluptate ullamco nulla nisi sunt amet culpa. Ullamco eu irure veniam commodo eiusmod sunt pariatur qui aliqua tempor do irure. Commodo eiusmod cupidatat excepteur consequat culpa eu voluptate et aliqua amet. Non exercitation adipisicing eu mollit non.\r\n"
    },
    {
        _id: "5a6e35834155209b7ace6958",
        author: "Pearl Shaw",
        email: "pearlshaw@bytrex.com",
        title: "Lorem",
        body: "Velit nostrud non labore ad enim aliqua minim fugiat amet adipisicing. Excepteur minim dolor in et. Occaecat officia duis velit tempor ea consequat excepteur et sint dolor. Deserunt occaecat voluptate excepteur commodo reprehenderit exercitation commodo esse sint. Incididunt fugiat exercitation consequat quis pariatur. Laborum do dolore quis dolore et eu aliquip aliquip mollit tempor.\r\n"
    },
    {
        _id: "5a6e3583e79731d26d2ea5a3",
        author: "Ingram Ashley",
        email: "ingramashley@tetratrex.com",
        title: "ex",
        body: "Esse qui sint aliquip laboris irure magna. Aliqua nisi non in magna eiusmod dolore laboris exercitation tempor deserunt incididunt non velit. Quis esse qui officia voluptate laborum. Excepteur minim laborum in est dolore exercitation ex duis elit consectetur.\r\n"
    },
    {
        _id: "5a6e3583e55853f0848a3fd0",
        author: "Knapp Schmidt",
        email: "knappschmidt@cowtown.com",
        title: "consectetur",
        body: "Id in velit pariatur sunt pariatur laboris. Nisi cupidatat quis dolore ex cupidatat quis aliqua nisi veniam. Exercitation voluptate sint Lorem exercitation laboris aute culpa tempor reprehenderit sint. Dolore adipisicing sit est anim ullamco tempor anim ullamco. Exercitation non ullamco laborum irure officia. Anim minim cillum voluptate aliqua exercitation do do veniam quis culpa tempor nostrud. Commodo occaecat laborum reprehenderit amet labore proident tempor minim et sint ad laborum reprehenderit.\r\n"
    }
];

articlesDB.forEach((item, index) => {
    let article = new Article({
        _id: item._id,
        title: item.title,
        body: item.body,
        author: item.author,
        publishedAt: (new Date()).toLocaleString(),
        email: item.email
    });

    article.save(error => {
        error ? console.error('Unable to fill the Database:', error) :
            console.log(`Article ${index} successfully added`);
    });
});
