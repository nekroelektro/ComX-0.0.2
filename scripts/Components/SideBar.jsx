var SideBarReact = React.createClass({
	propTypes: {
	    random: React.PropTypes.array.isRequired,
	    comments: React.PropTypes.array.isRequired,
	    plazlistName: React.PropTypes.string.isRequired,
	    plazlist: React.PropTypes.string.isRequired
	},
	getInitialState: function() {
		return {
		    randomPosts: this.props.random,
		    lastComments: this.props.comments,
		    playName: this.props.plazlistName,
            play: this.props.plazlist
		};
	},
	render: function() {
		//var commentNodes = this.state.articles.map(function (comment) {
		//	return <Comment author={comment.Name}>{comment.Prologue}</Comment>;
		//});

		return (
			<div className="sideBar">
				<SideContact></SideContact>
                <SidePlazlist name={this.state.playName} code={this.state.play}></SidePlazlist>
			</div>
		);
	}
});

var SideContact = React.createClass({
    render: function() {
        return(
            <div className="sideContact">
                <span className="glyphicon glyphicon-fire" aria-hidden="true"></span> Kontakt:
                <hr className="sideGreenLine" />
                <div className="sideContactTitle">
                    nekro@nekroplaza.pl
                </div>
                <div className="sideSocial">
                    <div className="fb-page"
                         data-tabs="timeline"
                         data-href="https://www.facebook.com/nekroplaza"
                         data-width="380"
                         data-hide-cover="false"
                         data-show-facepile="false"
                         data-show-posts="false">
                    </div>
                </div>
            </div>
            );
    }
});

var SidePlazlist = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="sidePlazlist">
                <div className="sideTitle">
                    <span className="glyphicon glyphicon-fire" aria-hidden="true"></span> Plazlista:
                    <hr className="sideGreenLine" />
                </div>
                <div className="sidePlazlistTitle">{this.props.name}</div>
                <iframe className="sidePlazlistWidget" src={this.props.code} frameborder="0" allowtransparency="true"></iframe>
            </div>
        );
    }
});

var SideLastComments = React.createClass({
    propTypes: {
        randomComments: React.PropTypes.object,
    },
    getInitialState: function () {
        return {
            comments: this.props.randomComments
        };
    },
    render: function() {
        var commentNodes = this.state.comments.map(function (comment) {
            return <Comment id={comment.Id} articleId={comment.ArticleId} userId={comment.UserId} isDiary={comment.isDiary}></Comment>;
        });

        return (
            <div className="sideLastComments">
                <span className="glyphicon glyphicon-fire" aria-hidden="true"></span> Ostatnie komentarze:
                <hr className="sideGreenLine"/>
                <div className="sideLastCommentsBody">
                    {commentNodes}
                </div>
            </div>
            );
    }
});

var Comment = React.createClass({
    propTypes: {
        comment: React.PropTypes.object.isRequired
    },
    render: function() {
        //var url = Router.action("Details", "Articles", );
        return(
            <div className="singleComment">
            <a className="sideLastCommentAnchor" href="#commentSection">
                    <div className="sideLastCommentsBodySingle">
                        <div className="sideLastCommentsArticle"><span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> @documentService.GetDocument(item.ArticleId, item.IsDiary).Name</div>
                        <div className="sideLastCommentsUser">
                            <b>by @userHelper.GetUserById(item.UserId).UserName</b>
                        </div>
                    </div>
                </a>
            </div>
            );
    }
});