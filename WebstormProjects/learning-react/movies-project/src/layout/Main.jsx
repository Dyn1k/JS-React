import React from 'react';
import {Search} from '../components/Search';
import {Movies} from '../components/Movies';
import {Preloader} from '../components/Preloader';

const KEY_API = process.env.REACT_APP_KEY_API;

class Main extends React.Component {

    state = {
        movies: ['warcraft'],
        loading: true,
    }

    componentDidMount() {
        fetch(`https://www.omdbapi.com/?apikey=${KEY_API}&s=${this.state.movies}`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, loading: false}))
            .catch((error) => {
               console.error(error);
               this.setState({loading: false});
            });
    }

    searchMovies = (str, type = 'all') => {
        this.setState({loading: true})
        fetch(`https://www.omdbapi.com/?apikey=${KEY_API}&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, loading: false}))
            .catch((error) => {
                console.error(error);
                this.setState({loading: false});
            });
    }

    render() {
        const {movies, loading} = this.state;
        return (
            <main className={'container content'}>
                <Search searchMovies={this.searchMovies} film={this.state.movies}/>
                {loading ? (
                    <Preloader/>
                ) : <Movies movies={movies}/>}
            </main>
        );
    }
}

export {Main};