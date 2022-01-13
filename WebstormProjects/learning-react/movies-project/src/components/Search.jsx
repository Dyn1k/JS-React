import React from 'react';

class Search extends React.Component {
    state = {
        search: this.props.film,
        type: 'all',
    }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.props.searchMovies(this.state.search, this.state.type)
        }
    }

    handleFilter = (event) => {
        this.setState(() => ({type: event.target.dataset.type}), () => {
            this.props.searchMovies(this.state.search, this.state.type)
        })
    }

    render() {
        const {search} = this.state;
        return <div className="row">
            <div className="col s12">
                <div className="input-field">
                    <input
                        className="validate"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(event) => this.setState({search: event.target.value})}
                        onKeyDown={this.handleKey}
                    />
                    <button className="btn deep-purple" onClick={() => this.props.searchMovies(this.state.search, this.state.type)}>Search</button>

                </div>
            </div>
            <label>
                <input
                    className="with-gap "
                    name="type"
                    type="radio"
                    data-type="all"
                    onChange={this.handleFilter}
                    checked={this.state.type === 'all'}
                />
                <span>All</span>
            </label>
            <label>
                <input
                    className="with-gap"
                    name="type"
                    type="radio"
                    data-type="movie"
                    onChange={this.handleFilter}
                    checked={this.state.type === 'movie'}
                />
                <span>Only Films</span>
            </label>
            <label>
                <input
                    className="with-gap"
                    name="type"
                    type="radio"
                    data-type="series"
                    onChange={this.handleFilter}
                    checked={this.state.type === 'series'}
                />
                <span>Only Series</span>
            </label>
        </div>
    }
}

export {Search};