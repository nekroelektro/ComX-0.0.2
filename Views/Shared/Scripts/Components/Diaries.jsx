var Diaries = React.createClass({
    propTypes: {
        model: React.PropTypes.array.isRequired,
        isIndex: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        return {
            model: this.props.model,
            isAjaxRequest: this.props.isIndex
        };
    },
    render: function() {
        return (
            <div className="mainDiaryContainer">
                <DiariesGui isAjaxRequest={this.state.isAjaxRequest}></DiariesGui>
                <DiariesList model={this.state.model}></DiariesList>
            </div>
		);
    }
});

var DiariesGui = React.createClass({
    propTypes: {
        isAjaxRequest: React.PropTypes.bool.isRequired
    },
    render: function () {
        return (
			<div className="diaryTitlePanel">
                {this.props.isAjaxRequest &&
                    <div className="articlesIndexHeader">
                        <h3><span className="glyphicon glyphicon-book" aria-hidden="true"></span> Z PAMIĘTNIKA PŁYTOHOLIKA:</h3>
                    </div>
                }
                <div className="categoryArticleTitle">
                    <h2>Witaj w pamiętniku płytoholika, wędrowcze!</h2>
                    <hr />
                    <h3>
                        Pamiętnik to właściwie zapis katalogowy moich muzycznych nabytków.
                        Zdecydowanie jestem nałogowym, płytowym kolekcjonerem, a nałóg ten nasila się w sposób regularny.
                        Witaj w moim świecie, świecie!
                    </h3>
                    <hr />
                    <div className="diaryButtonContainer">
                        <div className="diarySortButtons">
                            <button type="button" className="btn nekrobutton-green btn-m" id="diarySortCatalog">
                                <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
                            </button>
                            <button type="button" className="btn nekrobutton-green btn-m" id="diarySortList">
                                <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                            </button>
                        </div>
                        {this.props.isAjaxRequest &&
                            <div className="navigationBackButton">
                                <button type="button" className="btn nekrobutton-green btn-m">
                                    <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span> POWRÓT
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
		);
    }
});

var DiariesList = React.createClass({
	propTypes: {
	    model: React.PropTypes.array.isRequired
	},
	getInitialState: function () {
	    return {
	        model: this.props.model
	    };
	},
	render: function () {
	    var diaryCatalogNodes = this.state.model.map(function (diary) {
	        return <DiaryCatalogElement name={diary.Name} code={diary.Code} imagePath={diary.ImageUrl}></DiaryCatalogElement>;
	    });

	    var diaryListNodes = this.state.model.map(function (diary) {
	        return <DiaryListElement name={diary.Name} code={diary.Code} imagePath={diary.ImageUrl}></DiaryListElement>;
	    });
		return (
			<div className="diaryContainer">
                <div className="indexReviewsContainer" id="diaryCatalog">
                    {diaryCatalogNodes}
                </div>
                <ul className="indexDiaryList" id="diaryList">
                    {diaryListNodes}
                </ul>
            </div>
		);
	}
});

var DiaryCatalogElement = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        imagePath: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="diaryCatalogElement">
                <a className="indexSingleReviewAnchor" href={"/" + this.props.code}>
                    <div className="indexSingleReview col-xs-4">
                        <div className="indexSingleReviewImageContainer">
                            <img id="reviewIndexImage" src={this.props.imagePath}/>
                        </div>
                        <div className="bannerPanelInfoIndex">
                            <h3 className="bannerArticleNameIndex">{this.props.name}</h3>
                            <hr className="articlesIndexLine" />
                        </div>
                    </div>
                </a>
             </div>
            );
    }
});

var DiaryListElement = React.createClass({
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
