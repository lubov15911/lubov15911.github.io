import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.filterArticles = this.filterArticles.bind(this);
    }

    filterArticles(e) {
        e.preventDefault();
        this.props.filterArticles(e.target.search.value);
    }

    render () {
        return (
            <form onSubmit={this.filterArticles}>
                <input type='search'
                       name='search'
                       placeholder='Search...'
                       autoFocus
                       className='search' />
            </form>
        )
    }
}