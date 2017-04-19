var Comments = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        logged: React.PropTypes.bool,
        blocked: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            model: this.props.model,
            logged: this.props.logged,
            blocked: this.props.blocked
        };
    },
    render: function() {
        return (
            <div className="commentSection" id="detailsCommentSection">
                <AddComment logged={this.state.logged} blocked={this.state.blocked} comment={this.state.model.Comment} articleId={this.state.model.ArticleId} isDiary={this.state.model.IsDiary}></AddComment>
                <hr />
                <div id="commentsMade">
                    <h3 className="commentaryHeader">Komentarze({this.state.model.Comments.length})</h3>
                    <CommentsReady comments={this.state.model.Comments}></CommentsReady>
                </div>
            </div>
		);
    }
});

var AddComment = React.createClass({
    propTypes: {
        logged: React.PropTypes.bool,
        blocked: React.PropTypes.bool,
        comment: React.PropTypes.object,
        articleId: React.PropTypes.string,
        isDiary: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            commentBody: this.props.comment.Body,
            articleId: this.props.articleId,
            isDiary: this.props.isDiary
        };
    },
    render: function () {
        return(
                <div className="newComment">
                    {this.props.logged == 1 && this.props.blocked ==0 &&
                        <div>
                            <h3 className="commentaryHeader">Napisz komentarz trzęsityłku:</h3>
                            <div className="newCommentSection">
                                <div className="form-horizontal">
                                    <div className="form-group commentForm">
                                        <div className="commentInputBlock">
                                            <textarea id="commentEditor" className="form-control articleEditor"></textarea>
                                        </div>
                                    </div>
                                    <input type="text" className="commentAddFormArtId" name="articleId" value={this.state.articleId}/>
                                    <div className="form-group">
                                        <div className="addcommentButtonContainer">
                                            <button type="submit" value={this.state.isDiary} className="btn nekrobutton-green addCommentButton">
                                                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Dodaj komentarz!
                                            </button>
                                            <a className="popupCommentEmpty" href="#emptyComment-modal"></a>
                                            <div id="emptyComment-modal" className="mfp-hide white-popup">
                                                <p>Oszalałeś!</p>
                                                <hr />
                                                <p>Nie możesz dodać pustego komentarza!</p>
                                                <button type="button" className="btn nekrobutton-green .btn-sm btnCancelDeletion">Dobra, już dobra...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>         
                        </div>      
                        }
                    {this.props.logged != 1 && this.props.blocked !=0 &&
                        <div className="newCommentnotLogged">
                            <h4>Jak chcesz skomentować, to się <a className="popupLoginModal loginComments" href="#login-modal">zaloguj</a> - opłaci Ci się, koleżko!</h4>
                        </div>
                    }
                    </div>
        
            );
    }
});

var CommentsReady = React.createClass({
	propTypes: {
	    comments: React.PropTypes.array.isRequired
	},
	getInitialState: function () {
	    return {
	        comments: this.props.comments
	    };
	},
	render: function () {
	    var commentNodes = this.state.comments.map(function (comment) {
	        return <CommentElement id={comment.Id} body={comment.Body} userName={comment.UserName} userId={comment.UserId} articleId={comment.ArticleId} date={comment.Date} isDiary={comment.IsDiary} isEditable={comment.IsEditable}></CommentElement>;
	    }, this);
		return (
            <div className="addedCommentsSection col-xs-12" id="commentSection">
			        {commentNodes}
                <div id="test-modal" className="mfp-hide white-popup">
                    <p>Potwierdź</p>
                    <hr />
                    <p>Czy na bank chcesz usunąć swój komentarz?</p>
                    <button type="button" className="btn btn-danger .btn-sm btnConfirmCommentDeletion">
                        Ta!
                    </button>
                    <button type="button" className="btn btn-info .btn-sm btnCancelDeletion">Nope!</button>
                </div>
                <div id="editComment-modal" className="mfp-hide white-popup wide-popup">
                    <h2>Edytuj komentarz:</h2>
                    <hr />
                        <div className="newCommentSection">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <div className="commentInputBlock">
                                        <textarea id="editCommentWindowContainer" className="form-control articleEditor"></textarea>
                                    </div>
                                </div>
                            <div className="form-group">
                                <div className="commentEditButtons">
                                    <button type="submit" className="btn nekrobutton-green submitEditCommentForm">
                                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Dodaj komentarz!
                                    </button>
                                    <button type="button" className="btn btn-danger .btn-sm btnCancelEdit">Anuluj</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	        </div>
		);
	}
});

var CommentElement = React.createClass({
    propTypes: {
        userName: React.PropTypes.string,
        body: React.PropTypes.string,
        date: React.PropTypes.string,
        id: React.PropTypes.string,
        articleId: React.PropTypes.string,
        userId: React.PropTypes.string,
        isEditable: React.PropTypes.bool,
        isDiary: React.PropTypes.bool
    },
    render: function () {
        return (
            <div className="singleCommentSection col-xs-11 col-xs-offset-1">
                <div className="col-xs-2 commentFooter">
                    <img src={"/Account/GetAvatar?userId=" + this.props.userId} />
                </div>
                <div className="col-xs-9 commentBody">
                    <div className="readyCommentDetails">
                        <div className="commentDetailsLeftContainer">
                            <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.props.userName} &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="glyphicon glyphicon-time" aria-hidden="true"></span> {this.props.date}
                        </div>
                            {this.props.isEditable == 1 &&
                                <div className="commentDetailsRightContainer">
                                    <a className="popupCommentEdit" data-id={this.props.id} data-art={this.props.articleId} data-diary={this.props.isDiary} data-body={this.props.body} href="#editComment-modal"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>
                                    <a className="popupCommentDelete" data-id={this.props.id} data-art={this.props.articleId} data-diary={this.props.isDiary} href="#test-modal"><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
                                </div>
                            }
                        </div>
                        <div className="readyCommentBody">
                            <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                        </div>
                    </div>
          </div>
            );
}
});
