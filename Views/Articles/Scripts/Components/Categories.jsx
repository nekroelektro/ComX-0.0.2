﻿var Categories = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        isIndex: React.PropTypes.bool.isRequired,
        sub: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            model: this.props.model,
            isAjaxRequest: this.props.isIndex,
            sub: this.props.sub
        };
    },
    render: function () {
        return (
            <div className="mainCategoryContainer" id="Kategoria" data-isnavpanel="true">
                <CategoriesGui name={this.state.model.CategoryName} isAjaxRequest={this.state.isAjaxRequest} sub={this.state.model.Subcategories} description={this.state.model.Description}></CategoriesGui>
                {this.state.model.CategoryPosts.length > 0 ?
                    (
                    <CategoryList model={this.state.model.CategoryPosts}></CategoryList>
                    ) : (
                    <div className="noItemsInCategorySection">
                        <h3>:( <br />Nie bój, nie bój, jeszcze żadnych dobroci tu nie ma. Pewnikiem będą niebawem.</h3>
                    </div>
                    )
                }
            </div>
		);
    }
});

var CategoriesGui = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        isAjaxRequest: React.PropTypes.bool.isRequired,
        sub: React.PropTypes.array.isRequired,
        description: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            sub: this.props.sub,
            isAjaxRequest: this.props.isAjaxRequest
        };
    },
    render: function () {
        return (
			<div className="categoryTitlePanel">
                <div className="articlesIndexHeader">
                    <h3><span className="glyphicon glyphicon-tags" aria-hidden="true"></span>&nbsp;&nbsp; KATEGORIE:</h3>
                </div>
                <div className="categoryArticleTitle">
                    <div className="categoryArticleTitle">
                        <h2>Przeglądasz posty z kategorii <b>{this.props.name}</b>:</h2>
                    </div>
                    <hr />
                    <h3>
                        {this.props.description}
                    </h3>
                    <hr />
                    <SubCategoryPanel sub={this.state.sub} isAjaxRequest={this.state.isAjaxRequest}></SubCategoryPanel>
                </div>
			</div>
		);
    }
});

var CategoryList = React.createClass({
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
            return <CategoryElement name={article.Name} code={article.CodedName} imagePath={article.ImageUrl} isDiary={article.IsDiary} subcategory={article.Subcategory }></CategoryElement>;
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

var CategoryElement = React.createClass({
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