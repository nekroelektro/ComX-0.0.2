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
            <div id="Posty">
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
                                    <img src={this.props.imagePath} />
                                </div>
                                <div className="bannerPanelImageMainIndex">
                                    <img id="articleIndexImage" src={this.props.imagePath} />
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
            return <IndexDiary name={diary.Name} code={diary.Code} imagePath={diary.ImageUrl }></IndexDiary>;
	    });
        return (
            <div id="Pamiętnik">
			<div className="indexDiary articlesIndexReviewsContainer">
                <div className="articlesIndexHeader">
                    <h3><span className="glyphicon glyphicon-book" aria-hidden="true"></span> Z PAMIĘTNIKA PŁYTOHOLIKA:</h3>
                </div>
                <ul className="indexDiaryList">
                    {diaryNodes}
                </ul>
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

var IndexDiary = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        imagePath: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="indexSingleArticleContainerDiary col-sm-12">
                    <a className="indexSingleDiaryAnchor" href={"/" + this.props.code + "?isDiary=true"}>
                        <div className="diaryNameContainer">
                            <h4 className="indexDiaryName"># {this.props.name}</h4>
                        </div>
                        <div className="bannerPanelImageContainerIndexDiary">
                            <img src={this.props.imagePath} />
                        </div>
                        <div className="imageOverlayColorDiaryIndex"></div>
                    </a>
                    <div className="flyingWindow">
                        <img src={this.props.imagePath} />
                    </div>
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
            <div id="Recenzje">
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
                    <div className="indexSingleReviewImageContainer">
                        <img id="reviewIndexImage" src={this.props.imagePath} />
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
