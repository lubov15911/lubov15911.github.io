import React, { Component } from 'react';
import Authorization from './Authorization';
import Search from './Search';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.filterArticles = props.filterArticles;
    }

    render() {
        return (
            <header className='header'>
                <h1>Blog</h1>
                <Search filterArticles={this.filterArticles} />
                <Authorization />
            </header>
        )
    }
}