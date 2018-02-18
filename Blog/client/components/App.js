import React, { Component } from 'react';
import Header from './Header';
import ArticleList from './ArticleList';
import CreationForm from './CreationForm';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.updateArticles = this.updateArticles.bind(this);
        this.filterArticles = this.filterArticles.bind(this);
        this.state = {
            shouldUpdate: false,
            filter: ''
        }
    }

    updateArticles() {
        // Trigger article list updating
        this.setState({ shouldUpdate: true });
        // Reset update state
        this.setState({ shouldUpdate: false });
    }

    filterArticles(filter) {
        this.setState({ filter: filter });
    }

    render() {
        return (
            <div className="content">
                <Header filterArticles={this.filterArticles} />
                <main>
                    <CreationForm updateArticles={this.updateArticles} />
                    <ArticleList shouldUpdate={this.state.shouldUpdate}
                                 filter={this.state.filter} />
                </main>
            </div>
        )
    }
}