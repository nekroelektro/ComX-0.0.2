var IndexMain = React.createClass({
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
            <div className="indexContainer">
                <IndexMainArticles articles={this.state.model.Articles} sub={this.state.model.Subcategories}></IndexMainArticles>
			    <IndexMainDiaries diaries={this.state.model.Diaries}></IndexMainDiaries>
                <IndexMainReviews reviews={this.state.model.Reviews}></IndexMainReviews>
            </div>
		);
    }
});

var IndexMainArticles = React.createClass({
	propTypes: {
	    articles: React.PropTypes.array.isRequired,
        sub: React.PropTypes.array.isRequired
	},
	getInitialState: function () {
	    return {
	        articles: this.props.articles,
            sub: this.props.sub
	    };
	},
	render: function () {
	    var articleNodes = this.state.articles.map(function (article) {
	        return <IndexArticle name={article.Name} code={article.CodedName} body={article.Body} imagePath={article.ImageUrl} category={article.Category} subcategory={article.Subcategory}></IndexArticle>;
	    });
	    return (
            <div id="Posty" data-isnavpanel="true">
			    <div id="pager">
                    <div className="articlesIndexHeader">
                        <h3><span className="glyphicon glyphicon-th-large" aria-hidden="true"></span> POSTY:</h3>
                    </div>
                    <ul className="content articlesIndexTable" id="content">
                        {articleNodes}
                    </ul>
                    <div className="page_navigation"></div>
			    </div>
            </div>
		);
	}
});

var IndexArticle = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        body: React.PropTypes.string,
        imagePath: React.PropTypes.string,
        category: React.PropTypes.string,
        subcategory: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="indexSingleArticleContainer col-md-4 col-sm-12">
                    <a className="singleIndexAnchor" href={"/" + this.props.code}>
                            <div className="articlesIndexSingleImage sliderRightPanelElement">
                                <p className="bannerArticleTagsIndex">
                                    <span className="glyphicon glyphicon-tags" aria-hidden="true"></span> {this.props.category},
                                    {this.props.subcategory}
                                </p>
                                <div className="bannerPanelImageContainerIndex">
                                    <img src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy"/>
                                </div>
                                <div className="bannerPanelImageMainIndex">
                            <img id="articleIndexImage" src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy"/>
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

var IndexMainDiaries = React.createClass({
    propTypes: {
        diaries: React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return {
            diaries: this.props.diaries
        };
    },
    render: function () {
        var diaryNodes = this.state.diaries.map(function (diary) {
            return <IndexDiary name={diary.Name} imagePath={diary.ImageUrl }></IndexDiary>;
        });

        var diaryImageNodes = this.state.diaries.map(function (diary) {
            return <DiaryImageNodes imagePath={diary.ImageUrl} code={diary.Code} name={diary.Name}></DiaryImageNodes>;
        });
        return (
            <div id="Pamiętnik" data-isnavpanel="true">
			<div className="indexDiary articlesIndexReviewsContainer">
                <div className="articlesIndexHeader">
                    <h3><span className="glyphicon glyphicon-book" aria-hidden="true"></span> Z PAMIĘTNIKA PŁYTOHOLIKA:</h3>
                </div>
                <div className="indexDiaryContentContainer">
                        <div className="indexDiaryPreviewWindow">
                            {diaryImageNodes}
                        </div>
                        <ul className="indexDiaryList">
                            {diaryNodes}
                        </ul>
                </div>
                <div className="moreMusicReviews">
                    <a className="seeMoreReviewsFromIndex" id="indexSeeDiaryCategory">
                        <h4>PRZEJDŹ DO PAMIĘTNIKA <span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span></h4>
                    </a>
                </div>
			</div>
            </div>
		);
    }
});

var DiaryImageNodes = React.createClass({
    propTypes: {
        imagePath: React.PropTypes.string,
        code: React.PropTypes.string,
        name: React.PropTypes.string,
    },
    render: function () {
        return (
            <div className="bannerPanelImageContainerIndexDiary">
                <a className="indexSingleDiaryAnchor" href={"/" + this.props.code + "?isDiary=true"}>
                    <img src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy"/>
                    <div className="bannerPanelImageContainerTitleIndexDiary">
                        <p># {this.props.name}</p>
                    </div>
                </a>
            </div>
        );
    }
});

var IndexDiary = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        imagePath: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="indexSingleArticleContainerDiary col-sm-12">
                <div className="diaryNameContainer">
                    <h4 className="indexDiaryName"># {this.props.name}</h4>
                </div>
                <div className="bannerPanelImageContainerIndexDiary">
                    <img src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy"/>
                </div>
                <div className="imageOverlayColorDiaryIndex"></div>
            </div>
            );
    }
});

var IndexMainReviews = React.createClass({
    propTypes: {
        reviews: React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return {
            reviews: this.props.reviews
        };
    },
    render: function () {
        var reviewNodes = this.state.reviews.map(function (review) {
            return <IndexReview name={review.Name} code={review.Code} imagePath={review.ImageUrl }></IndexReview>;
        });
        return (
            <div id="Recenzje" data-isnavpanel="true">
			<div className="articlesIndexReviewsContainer">
                <div className="articlesIndexHeader">
                    <h3><span className="glyphicon glyphicon-cd" aria-hidden="true"></span> OSTATNIE RECKI PŁYTOWE:</h3>
                </div>
                <div className="indexReviewsContainer">
                    {reviewNodes}
                </div>
                <div className="moreMusicReviews">
                    <a className="seeMoreReviewsFromIndex" id="indexSeeMusicReviewsCategory">
                        <h4>ZOBACZ WSZYSTKIE RECKI <span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span></h4>
                    </a>
                </div>
            </div>
            </div>
		);
    }
});

var IndexReview = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        imagePath: React.PropTypes.string
    },
    render: function () {
        return (
            <a className="indexSingleReviewAnchor" href={"/" + this.props.code}>
                <div className="indexSingleReview col-xs-4">
                    <div className="imageOverlayColorIndex"></div>
                    <div className="indexSingleReviewImageContainer">
                        <img id="reviewIndexImage" src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy" />
                    </div>
                    <div className="bannerPanelInfoIndex">
                        <h3 className="bannerArticleNameIndex">{this.props.name}</h3>
                        <hr className="articlesIndexLine" />
                    </div>
                </div>
            </a>
            );
    }
});
