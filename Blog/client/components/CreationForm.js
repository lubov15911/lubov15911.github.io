import React, { Component } from 'react';

export default class CreationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusMessage: ''
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        let form = event.target;
        let data = {
            title: form.title.value,
            body: form.body.value,
            author: form.author.value,
            email: form.email.value
        };

        fetch('/article', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((data) => {
            this.resetForm();
            this.setState({ statusMessage: data.statusText });
            this.props.updateArticles();
        }).catch((err) => {
            this.resetForm();
            this.setState({ statusMessage: err.statusText });
        });
    }

    resetForm () {
        this.myFormRef.reset();
    };

    render() {
        const statusElement = this.state.statusMessage && <p>{this.state.statusMessage}</p>;
        return (
            <section>
                <h2>Create an article:</h2>
                <form onSubmit={this.handleSubmit.bind(this)} ref={(el) => this.myFormRef = el}>
                    <input type="text"
                           name='title'
                           placeholder='Enter title of article'
                           required />
                    <input type="text"
                           name='author'
                           placeholder='Type your name'
                           required />
                    <input type="email"
                           name='email'
                           placeholder='Your email (optional)' />
                    <textarea name="body"
                              placeholder='Body of article'
                              cols="22"
                              required />
                    <button>Create</button>
                </form>
                {statusElement}
            </section>
        )
    }
}
