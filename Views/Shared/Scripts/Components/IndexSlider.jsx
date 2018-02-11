var IndexSlider = React.createClass({
    propTypes: {
        model: React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return {
            model: this.props.model
        };
    },
    render: function () {
        return (
            <div className="indexSliders" id="Start" data-isnavpanel="true">
                <SlidersContainer articles={this.state.model}></SlidersContainer>
			    <SliderSection articles={this.state.model}></SliderSection>
            </div>
		);
    }
});

var SlidersContainer = React.createClass({
    propTypes: {
        articles: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            articles: this.props.articles
        };
    },
    render: function () {
        var articleNodes = this.state.articles.map(function (article) {
            return <SliderOneElement name={article.Name} code={article.CodedName} author={article.UserName} imagePath={article.ImageUrl} date={article.Date} category={article.Category} subcategory={article.Subcategory} series={article.Series} isDiary={article.IsDiary }></SliderOneElement>;
        });

        return (
            <div className="slidersContainer">
                <div className="slider-progress">
                    <div className="progress"></div>
                </div>
                <div className="sliderOne">
                    {articleNodes}
                </div>
            </div>
            );
    }
});

var SliderOneElement = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        imagePath: React.PropTypes.string,
        date: React.PropTypes.string,
        author: React.PropTypes.string,
        category: React.PropTypes.string,
        subcategory: React.PropTypes.string,
        series: React.PropTypes.string,
        isDiary: React.PropTypes.bool
    },
    render: function () {
        return (
            <div className="slideElementUpper">
                <a href={"/" + this.props.code}>
                    <div className="sliderLink">
                        <div className="bannerPanelInfo bannerPanelSlider">
                            <h2 className="bannerArticleName">{this.props.name}</h2>
                            <hr className="articlesIndexLine" />
                            <div className="datesDetailsArticles">
                                <p>
                                    <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.props.author} &nbsp;&nbsp;&nbsp;&nbsp; <span className="glyphicon glyphicon-time" aria-hidden="true"></span> {this.props.date} &nbsp;&nbsp;&nbsp;&nbsp;
                                    {!this.props.isDiary &&
                                        <span>
                                            <span className="glyphicon glyphicon-tags" aria-hidden="true"></span> {this.props.category},
                                            {this.props.subcategory}
                                        </span>
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="imageOverlayColorDiary"></div>
                        <div className="bannerPanelImageContainer">
                            <img src={this.props.imagePath} />
                        </div>
                        <div className="bannerPanelImageMainSlider">
                            <img src={this.props.imagePath} />
                        </div>
                    </div>
                </a>
            </div>
            );
    }
});

var SliderSection = React.createClass({
    propTypes: {
        articles: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            articles: this.props.articles
        };
    },
    render: function () {
        var articleNodes = this.state.articles.map(function (article) {
            return <SliderTwoElement article={article}></SliderTwoElement>;
        });

        return (
            <div className="sliderSection">
                { articleNodes }
            </div>
            );
    }
});

var SliderTwoElement = React.createClass({
    propTypes: {
        article: React.PropTypes.object
    },
    render: function () {
        return (
            <div className="slideElementDown">
                <div className="articlesIndexSingleImage sliderRightPanelElement">
                    {this.props.article.Series != null && this.props.article.Series.length > 0 &&
                        <h3 className="bannerSeriesTitle currentBottomIndexSlideContent">{this.props.article.Series}</h3>
                    }
                    {!this.props.article.IsDiary &&
                        <p className="bannerArticleTagsIndex currentBottomIndexSlideContent">
                            <span className="glyphicon glyphicon-tags" aria-hidden="true"></span> {this.props.article.Category},
                            {this.props.article.Subcategory}
                        </p>
                    }
                    <div className="bannerPanelImageContainerIndex">
                        <img src={this.props.article.ImageUrl} />
                    </div>
                    <div className="bannerPanelInfoIndex bannerPanelInfoIndexTopNavigation">
                        <h3 className="bannerArticleNameIndexTopMenu">{this.props.article.Name}</h3>
                        <hr className="articlesIndexLine articlesIndexLineSliderRight" />
                        <div className="currentBottomIndexSlideContent">
                            <div className="datesDetailsArticles">
                                <p>
                                    <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.props.article.UserName} &nbsp;&nbsp;&nbsp;&nbsp; <span className="glyphicon glyphicon-time" aria-hidden="true"></span> {this.props.article.Date}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
});
