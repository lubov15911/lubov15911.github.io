/**
 * Prototype pattern
 * [creational]
 */
let ImagePrototype = {
    init(url, title) {
        this.url = url;
        this.title = title;
    },

    getHTMLElement() {
        let image = document.createElement('img');
        image.src = this.url;
        image.alt = this.title;
        return image;
    }
};

function Image(logoUrl, title) {
    function F() {}
    F.prototype = ImagePrototype;

    let f = new F();

    f.init(logoUrl, title);
    return f;
}

export default Image;
