import React, { Component } from 'react';

export default class Article extends Component {
    constructor(props) {
        super(props);

        this.deleteArticle = this.deleteArticle.bind(this);
        this.state = {
            isShown: true,
            filter: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filter !== this.state.filter) {
            this.setState({ filter: nextProps.filter });
        }
    }

    deleteArticle() {
        fetch('/article/' + this.props.article._id, {
            method: 'DELETE'
        }).then((data => {
            this.setState({
                isShown: false
            });
        })).catch((err) => {
            console.error('On deleteArticle error:', err);
        });
    }

    render() {
        const {article} = this.props;

        // Show article if there is no any filter or if author is matched to the filter
        return (this.state.isShown && (!this.state.filter || article.author.indexOf(this.state.filter) !== -1)) ? (
            <div className="article">
                <h2>"{article.title}" by {article.author}</h2>
                <p>{article.body}</p>
                <p>Published at {article.publishedAt}</p>
                <button disabled>Edit</button>
                <button onClick={this.deleteArticle}>Delete</button>
            </div>
        ) : null;
    }
}
