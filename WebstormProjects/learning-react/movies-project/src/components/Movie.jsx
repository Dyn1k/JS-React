function Movie(props) {

    const {Title, Year, imdbID, Type, Poster} = props;

    return <div id={imdbID} className="card movie">
        <div className="card-image waves-effect waves-block waves-light">
            {
                Poster === 'N/A' ? (
                    <img className="activator poster-height" src={`https://via.placeholder.com/329x493?text=${Title}`}
                         alt="Poster"/>
                ) : (
                    <img className="activator poster-height" src={Poster} alt="Poster"/>
                )}
        </div>
        <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{Title}</span>
            <p>{Year} <span className="right">{Type}</span></p>
        </div>
    </div>
}

export {Movie};