var SearchPanel = React.createClass({
    render: function() {
        return (
            <div className="searchBar">
                <input id="searchBarMain" placeholder="Wyserczuj se..." />
                    <div className="searchResultsContainer">
                        <div className="searchResultsElements">
                        </div>
                        <div className="searchResultsMore">
                            <h4>Pokaż wszystkie wyniki</h4>
                        </div>
                        <div className="searchResultsNoMore">
                            <h4>Wincyj nie znalazłem</h4>
                        </div>
                    </div>
            </div>
		);
    }
});
