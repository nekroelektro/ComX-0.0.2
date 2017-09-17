var SearchResults = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            model: this.props.model
        };
    },
    render: function () {
        return (
            <div className="mainCategoryContainer" id="Szukaczka" data-isnavpanel="true">
                <SearchGui searchString={this.state.model.SearchString} sub={this.state.model.Subcategories}></SearchGui>
                <SearchList model={this.state.model.SearchPosts}></SearchList>
            </div>
		);
    }
});

var SearchGui = React.createClass({
    propTypes: {
        searchString: React.PropTypes.string.isRequired,
        sub: React.PropTypes.array
    },
    getInitialState: function () {
        return {
            searchString: this.props.searchString,
            sub: this.props.sub
        };
    },
    render: function () {
        return (
			<div className="categoryTitlePanel">
                <div className="articlesIndexHeader">
                    <h3><span className="glyphicon glyphicon-search" aria-hidden="true"></span>&nbsp;&nbsp; Wyszukaj:</h3>
                </div>
                <div className="categoryArticleTitle">
                    <div className="categoryArticleTitle">
                        <h2>Przeszukujesz Plazę na okoliczność "<b>{this.state.searchString}</b>":</h2>
                    </div>
                    <hr />
                    <hr />
                    <hr />
                    <SubCategoryPanel sub={this.state.sub} isAjaxRequest={false}></SubCategoryPanel>
                </div>
			</div>
		);
    }
});

var SearchList = React.createClass({
    propTypes: {
        model: React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return {
            model: this.props.model
        };
    },
    render: function () {
        var categoryArticleNodes = this.state.model.map(function (article) {
            return <SearchElement name={article.Name} code={article.CodedName} imagePath={article.ImageUrl} isDiary={article.IsDiary} subcategory={article.Subcategory }></SearchElement>;
        });
        return (
			<div id="pagerCategories">
                <ul className="content articlesIndexTable" id="content">
                    {categoryArticleNodes}
                </ul>
                <hr />
                <div className="page_navigation"></div>
			</div>
		);
    }
});

var SearchElement = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        imagePath: React.PropTypes.string,
        isDiary: React.PropTypes.bool,
        subcategory: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="indexSingleArticleContainer col-md-6 col-sm-12" id="singleCategoryViewItem" data-sub={this.props.subcategory}>
                <a className="singleIndexAnchor" href={"/" + this.props.code}>
                    <div className="articlesIndexSingleImage sliderRightPanelElement">
                        <div className="bannerPanelImageContainerIndex">
                            <img src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy" />
                        </div>
                        <div className="bannerPanelImageMainIndex">
                            <img id="articleIndexImage" src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy" />
                        </div>
                        <div className="imageOverlayColorIndex"></div>
                        <div className="bannerPanelInfoIndex">
                            <h3 className="bannerArticleNameIndex">{this.props.name}</h3>
                            <hr className="articlesIndexLine" />
                            <div className="bannerArticlePreludeIndex">
                                <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            );
    }
});