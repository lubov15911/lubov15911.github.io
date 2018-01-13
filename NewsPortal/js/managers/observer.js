class ObserverList {
    constructor() {
        this.observerList = [];
    }

    // Getters
    get getLength() {
        return this.observerList.length;
    }

    // Methods
    add(observer) {
        this.observerList.push(observer);
    }

    get(index) {
        if(index > -1 && index < this.observerList.length){
            return this.observerList[index];
        }
    }

    indexOf(observer, startIndex) {
        let i = startIndex;

        while (i < this.observerList.length) {
            if (this.observerList[i] === observer) { return i; }
            i++;
        }

        return -1;
    }

    removeAt(index) {
        this.observerList.splice(index, 1);
    }
}

export default ObserverList;
