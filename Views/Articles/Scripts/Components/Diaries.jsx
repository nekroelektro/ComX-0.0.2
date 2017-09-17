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
            <div className="mainDiaryContainer" id="Pamiętnik" data-isnavpanel="true">
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
                <div className="articlesIndexHeader">
                    <h3><span className="glyphicon glyphicon-book" aria-hidden="true"></span> Z PAMIĘTNIKA PŁYTOHOLIKA:</h3>
                </div>
                <div className="categoryArticleTitle">
                    <h2>Witaj w pamiętniku płytoholika, wędrowcze!</h2>
                    <hr />
                    <h3>
                        Pamiętnik to właściwie zapis katalogowy moich muzycznych nabytków.
                        Zdecydowanie jestem nałogowym, płytowym kolekcjonerem, a nałóg ten nasila się w sposób regularny.
                        Witaj w moim świecie, świecie!
                    </h3>
                    <hr />
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
	    var diaryListNodes = this.state.model.map(function (diary) {
	        return <DiaryListElement name={diary.Name} code={diary.Code} imagePath={diary.ImageUrl}></DiaryListElement>;
	    });
		return (
			<div className="diaryContainer">
                <div id="diaryList">
                    <ul className="indexDiaryList content" id="content">
                        {diaryListNodes}
                    </ul>
                    <div className="page_navigation"></div>
                </div>
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
            <div className="indexSingleArticleContainerDiary diarylistElementCategoryView col-sm-12">
                    <a className="indexSingleDiaryAnchor" href={"/" + this.props.code + "?isDiary=true"}>
                        <div className="diaryNameContainer">
                            <h4 className="indexDiaryName"># {this.props.name}</h4>
                        </div>
                        <div className="bannerPanelImageContainerIndexDiary">
                            <img src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy" />
                        </div>
                        <div className="imageOverlayColorDiaryIndex"></div>
                    </a>
                    <div className="flyingWindow">
                        <img src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy" />
                    </div>
            </div>
            );
    }
});
