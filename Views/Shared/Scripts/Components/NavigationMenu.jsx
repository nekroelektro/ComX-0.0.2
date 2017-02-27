var NavigationMenu = React.createClass({
    propTypes: {
        model: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            model: this.props.model
        };
    },
    render: function() {
        return (
            <div className="main">
                <LogoMenu></LogoMenu>
                <CategoryContainer model={this.state.model}></CategoryContainer>
            </div>
		);
    }
});

var LogoMenu = React.createClass({
    render: function() {
        return(
            <div className="absoluteLogo">
                <a href={'/'}>
                    <img src={'/Content/images/logoWhiteSMALL.jpg'}/>
                </a>
            </div>
        );
    }
});

var CategoryContainer = React.createClass({
    propTypes: {
        model: React.PropTypes.array
    },
    getInitialState: function () {
        return {
            model: this.props.model
        };
    },
    render: function() {
        var categoryNodes = this.state.model.map(function (category) {
            return <TopNavCategoryElement name={category.CategoryName} posts={category.CategoryPosts } subcategories={category.Subcategories}></TopNavCategoryElement>;
        });

        return (
            <nav id="cbp-hrmenu" className="cbp-hrmenu">
                <ul className="topNavigationItemsContainer">
                    {categoryNodes}
                </ul>
            </nav>
            );
    }
});

var TopNavCategoryElement = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        posts: React.PropTypes.array,
        subcategories: React.PropTypes.array
    },
    getInitialState: function () {
        return {
            name: this.props.name,
            posts: this.props.posts,
            subcategories: this.props.subcategories
        };
    },
    render: function () {
        var isDiary = this.state.name == "Pamiętnik";
        var linkString;
        if (isDiary) {
            linkString = '/Articles/Diary/';
        } else {
            linkString = '/Categories/' + this.state.name;
        }
        var postNodes = this.state.posts.map(function (post) {
            return <TopNavPostElement name={post.Name} code={post.CodedName} imagePath={post.ImageUrl} isDiary={isDiary} subcategory={post.Subcategory}></TopNavPostElement>;
        }, true);

        var subcategoryNodes = this.state.subcategories.map(function (post) {
            return <TopNavSubcategoryElement name={post}></TopNavSubcategoryElement>;
        }, true);

        return (
            <li>
                <a className="topNavigationItem" href={'#'}>{this.state.name}</a>
                    <div className="cbp-hrsub">
                        <div className="cbp-hrsub-inner">
                            <div className="lastArticlesFromCategoryTopNavigation">
                                <div className="topNavigationTitlePanel">
                                    <h4 className="topNavigationNameTitle">Ostatnie posty z kategorii {this.state.name}:</h4>
                                    <div className="topNavigationSubcategoriesContainer">
                                        <div className="topNavigationSubcategoriesElement">Wszystkie
                                        </div>
                                        {subcategoryNodes}
                                    </div>
                                </div>
                                <div className="lastArticlesTop">
                                    {postNodes}
                                </div>
                            </div>
                            <div className="moreFromCategoryTopNavigation">
                                <a className="seeMoreFromCategoryTopNavigation" href={linkString}>
                                    <p>Zobacz wszystkie z kategorii {this.state.name} <span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span></p>
                                </a>
                            </div>
                        </div>
                    </div>
            </li>
            );
    }
});

var TopNavPostElement = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        imagePath: React.PropTypes.string,
        isDiary: React.PropTypes.bool,
        subcategory: React.PropTypes.string
    },
    render: function () {
        var linkToArticle;
        if (this.props.isDiary == 1) {
            linkToArticle = "/" + this.props.code + "?isDiary=true";
        } else {
            linkToArticle = "/" + this.props.code;
        }
        return (
            <a className="topNavigationLastAnchor" href={linkToArticle} data-sub={this.props.subcategory}>
                <div className="singleLastArticleTopNavigation">
                    <div className="imageOverlayColorNav"></div>
                        <div className="bannerPanelImageContainerNav">
                            <img src={this.props.imagePath} />
                        </div>
                        <div className="bannerPanelImageMainNav">
                            <img id="articleTopNavigationImage" src={this.props.imagePath} />
                        </div>
                        <div className="bannerPanelInfoIndex bannerPanelInfoIndexTopNavigation">
                            <h3 className="bannerArticleNameIndexTopMenu">{this.props.name}</h3>
                            <hr className="articlesIndexLine" />
                        </div>
                </div>
            </a>
        );
    }
});

var TopNavSubcategoryElement = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },
    render: function() {
        return(
            <div className="topNavigationSubcategoriesElement">
                {this.props.name}
            </div>
            );
    }
});