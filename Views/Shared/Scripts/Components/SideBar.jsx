var SideBarReact = React.createClass({
	propTypes: {
	    model: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
		    model: this.props.model
		};
	},
	render: function() {
		return (
			<div className="sideBar">
				<SideContact></SideContact>
                <SidePlazlist name={this.state.model.PlazlistName} code={this.state.model.PlazlistCode}></SidePlazlist>
                <SideLastComments comments={this.state.model.Comments}></SideLastComments>
                <SideRandomPosts posts={this.state.model.RandomPosts}></SideRandomPosts>
			</div>
		);
	}
});

var SideContact = React.createClass({
    render: function() {
        return(
            <div className="sideBarComponent firstSideComponent">
                <div className="sideTitle">
                    <h3>
                        <span className="glyphicon glyphicon-fire" aria-hidden="true"></span> Kontakt...
                    </h3>
                </div>
                <div className="sideBody">
                <div className="sideContactTitle">
                    nekro@nekroplaza.pl
                </div>
                <div className="sideSocial">
                    <div className="fb-page"
                         data-href="https://www.facebook.com/nekroplaza"
                         data-width="353"
                         data-hide-cover="false"
                         data-show-facepile="true"
                         data-show-posts="false">
                    </div>
                </div>
                <div className="recrutation">
                    <a href='/NekroPlaza+rekrutuje!'>
                        <img src='/Content/images/rekrutacja.png' />
                    </a>
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
            <div className="sideBarComponent">
                <div className="sideTitle">
                    <h3>
                        <span className="glyphicon glyphicon-fire" aria-hidden="true"></span> Plazlista...
                    </h3>
                </div>
                <div className="sideBody">
                    <div className="sidePlazlistTitle">{this.props.name}</div>
                    <iframe className="sidePlazlistWidget" src={this.props.code} frameborder="0" allowtransparency="true"></iframe>
                </div>
            </div>
        );
    }
});

var SideLastComments = React.createClass({
    propTypes: {
        comments: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            lastComments: this.props.comments
        };
    },
    render: function() {
        var commentNodes = this.state.lastComments.map(function (comment) {
            return <Comment article={comment.ArticleName} articleCode={comment.ArticleCodedName} user={comment.UserName} isDiary={comment.isDiary}></Comment>;
        });

        return (
            <div className="sideBarComponent">
                <div className="sideTitle">
                    <h3>
                        <span className="glyphicon glyphicon-fire" aria-hidden="true"></span> Ostatnie komentarze...
                    </h3>
                </div>
                <div className="sideBody">
                <div className="sideLastCommentsBody">
                    {commentNodes}
                </div>
                </div>
            </div>
            );
    }
});

var Comment = React.createClass({
    propTypes: {
        user: React.PropTypes.string,
        article: React.PropTypes.string,
        articleCode: React.PropTypes.string,
        isDiary: React.PropTypes.bool
    },
    render: function () {
        return(
            <div className="singleComment">
                <a className="sideLastCommentAnchor" href={"/" + this.props.articleCode}>
                    <div className="sideLastCommentsBodySingle">
                        <div className="sideLastCommentsArticle"><span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> {this.props.article}</div>
                        <div className="sideLastCommentsUser">
                            <b>by {this.props.user}</b>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
});

var SideRandomPosts = React.createClass({
    propTypes: {
        posts: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            randomPosts: this.props.posts
        };
    },
    render: function() {
        var postNodes = this.state.randomPosts.map(function (post) {
            return <RandomPosts name={post.Name} code={post.CodedName} body={post.Body} imagePath={post.ImageUrl}></RandomPosts>;
        });
        return(
            <div className="sideBarComponent sideRandomPosts">
                <div className="sideTitle">
                    <h3>
                        <span className="glyphicon glyphicon-fire" aria-hidden="true"></span> Losowe posty...
                    </h3>
                </div>
                <div className="sideBody">
                <div className="sidePostsBody">
                    {postNodes}
                </div>
                </div>
            </div>
            );
    }
});

var RandomPosts = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        code: React.PropTypes.string,
        body: React.PropTypes.string,
        imagePath: React.PropTypes.string
    },
    render: function() {
        return(
            <a className="sideRandomPostsAnchor" href={"/" + this.props.code}>
                        <div className="sideArt">
                                <div className="sidebarRandomArtImg">
                                    <div className="imageOverlayColorSide"></div>
                                    <div className="bannerPanelImageContainerSide">
                                        <img src={this.props.imagePath} />
                                    </div>
                                    <div className="bannerPanelImageMainSide">
                                        <img src={this.props.imagePath} />
                                    </div>
                                    <div className="bannerPanelInfoIndex infoIndexSide">
                                        <h3 className="bannerArticleNameIndex">{this.props.name}</h3>
                                        <hr className="articlesIndexLineGreen" />
                                        <div className="bannerArticlePreludeIndex">
                                            <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                                        </div>
                                    </div>
                                </div>
                            <div className="sidebarRandomArtBody">
                                <p>{this.props.name}</p>
                            </div>
                        </div>
                    </a>
            );
    }
});