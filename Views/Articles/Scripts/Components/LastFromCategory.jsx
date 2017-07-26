var LastFromCategory = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            model: this.props.model
        };
    },
    render: function() {
        return (
            <LastFromCategoryContainer articles={this.state.model.Articles} name={this.props.model.CategoryName}></LastFromCategoryContainer>
		);
    }
});

var LastFromCategoryContainer = React.createClass({
	propTypes: {
	    articles: React.PropTypes.array.isRequired,
	    name: React.PropTypes.string
	},
	getInitialState: function () {
	    return {
	        model: this.props.articles
	    };
	},
	render: function () {
	    var articleNodes = this.state.model.map(function (article) {
	        return <LastFromCategoryElement name={article.Name} code={article.CodedName} imagePath={article.ImageUrl}></LastFromCategoryElement>;
	    });
		return (
			<div className="lastFromCategoryPanel">
                <div className="lastFromCategoryLabel">
                    Zobacz ostatnie z tej kategorii:
                </div>
                <ul className="content articlesIndexTable" id="content">
                    {articleNodes}
                </ul>
                <div className="lastFromCategoryLabelLinkContainer">
                    <a className="seeMoreFromCategory" href={"/Categories/" + this.props.name}>
                        <p> Zobacz wszystkie z kategorii {this.props.name} <span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span></p>
                    </a>
                </div>
            </div>
		);
	}
});

var LastFromCategoryElement = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        imagePath: React.PropTypes.string
    },
    render: function () {
        return (
                <div className="indexSingleArticleContainer col-md-6 col-sm-12">
                    <a className="singleIndexAnchor" href={"/" + this.props.code}>
                            <div className="articlesIndexSingleImage sliderRightPanelElement">
                                <div className="bannerPanelImageContainerIndex">
                                    <img src={this.props.imagePath}/>
                                </div>
                                <div className="bannerPanelImageMainIndex">
                                    <img id="articleIndexImage" src={this.props.imagePath} />
                                </div>
                                <div className="imageOverlayColorIndex"></div>
                                <div className="bannerPanelInfoIndex bannerPanelInfoIndexTopNavigation">
                                    <h3 className="bannerArticleNameIndexTopMenu">{this.props.name}</h3>
                                    <hr className="articlesIndexLine" />
                                </div>
                            </div>
                    </a>
            </div>
            );
}
});
