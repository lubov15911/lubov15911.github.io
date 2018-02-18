import React, { Component } from 'react';
import Article from './Article';

export default class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.getArticles = this.getArticles.bind(this);
        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        this.getArticles();
    }

    componentWillReceiveProps(nextProps) {
        nextProps.shouldUpdate && this.getArticles();
    }

    getArticles() {
        fetch('/articles', {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data => {
            this.setState({
                articles: data.articles.reverse()
            });
        })).catch((err) => {
            console.error('On getArticles error:', err);
        });
    }

    render() {
        const articleElements = this.state.articles.length && this.state.articles.map((article) =>
            <Article key={article._id}
                     article={article}
                     filter={this.props.filter} />
        );

        const noArticlesElement = <h3>We are sorry, but we can not find articles</h3>;
        return (
            <section>
                <h2>Here the Articles:</h2>
                {articleElements ? articleElements : noArticlesElement}
            </section>
        )
    }
}
