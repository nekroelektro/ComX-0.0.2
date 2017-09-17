var SideBarReact = React.createClass({
    propTypes: {
        admin: React.PropTypes.bool.isRequired,
        authenticated: React.PropTypes.bool.isRequired,
        model: React.PropTypes.object.isRequired,
        isConfig: React.PropTypes.bool.isRequired,
	},
	getInitialState: function() {
	    return {
	        admin: this.props.admin,
	        auth: this.props.authenticated,
            model: this.props.model,
            isConfig: this.props.isConfig
		};
	},
	render: function() {
		return (
			<div className="sideBar">
                <SideProfileActions admin={this.state.admin} authenticated={this.state.auth} model={this.state.model.Profile}></SideProfileActions>
                <SideNavigation></SideNavigation>
                <SidePanelMenu model={this.state.model}></SidePanelMenu>
                <ConfigSideBar admin={this.state.admin} authenticated={this.state.auth} isConfig={this.state.isConfig}></ConfigSideBar>
			</div>
		);
	}
});

var SideProfileActions = React.createClass({
    propTypes: {
        admin: React.PropTypes.bool.isRequired,
        authenticated: React.PropTypes.bool.isRequired,
        model: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            admin: this.props.admin,
            auth: this.props.authenticated,
            model: this.props.model
        };
    },
    render: function() {
        return (
            <div className="sideBar sideBarSection">
                {this.state.auth ? (
                    <div>
                        <div className="sideBarComponent sideBarProfileComponent">
                            <div className="sideTitle sideProfileAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-triangle-bottom leftArrowSideIcon" aria-hidden="true"></span> {this.state.model.UserName}
                                </p>
                            </div>
                            <div className="logoComponentIcon">
                                {this.state.model.MessagesCount != 0 &&
                                            <div className="logoComponentNotificator">
                                                {this.props.model.MessagesCount}
                                            </div>
                                        }
                                <img className="logoProfileImage" src={"/Account/GetAvatar?userId=" + this.state.model.UserId} />
                            </div>
                        </div>
                        <div className="sideBody sideProfileBody">
                            <div className="logoComponentProfileContextMenu">
                                <div className="sideTitle sideShowProfileAnchor">
                                    <p>
                                        <span className="glyphicon glyphicon-user leftArrowSideIcon" aria-hidden="true"></span> Pokaż profil
                                    </p>
                                </div>
                                <div className="sideTitle sideMessagesAnchor">
                                    <p>
                                        <span className="glyphicon glyphicon-envelope leftArrowSideIcon" aria-hidden="true"></span> Prywatne wiadomości
                                    </p>
                                </div>
                            </div>
                        </div>
                        {this.state.admin &&
                            <div className="sideBarComponent">
                                <div className="sideTitle sideConfigurationAnchor">
                                    <p>
                                        <span className="glyphicon glyphicon-cog leftArrowSideIcon" aria-hidden="true"></span> Konfiguracja
                                    </p>
                                </div>
                            </div>
                        }
                        <div className="sideBarComponent">
                            <div className="sideTitle sideLogoutAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-off leftArrowSideIcon" aria-hidden="true"></span> Wyloguj
                                </p>
                            </div>
                        </div>
                    </div>     
                ) : (
                    <div>
                        <div className="sideBarComponent">
                            <div className="sideTitle sideLoginAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-triangle-bottom leftArrowSideIcon" aria-hidden="true"></span> Zaloguj
                                </p>
                            </div>
                            <div className="sideBody sideLoginBody">
                                <LoginSideForm></LoginSideForm>
                            </div>
                        </div>
                        <div className="sideBarComponent">
                            <div className="sideTitle sideRegisterAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-triangle-bottom leftArrowSideIcon" aria-hidden="true"></span> Zarejestruj
                                </p>
                            </div>
                            <div className="sideBody sideRegisterBody">
                                <RegisterSideForm></RegisterSideForm>
                            </div>
                        </div>
                    </div>               
                )}
                <div className="sideBarComponent sideBarSearchComponent">
                    <div className="sideTitle sideSearchAnchor">
                        <p>
                            <span className="glyphicon glyphicon-triangle-bottom leftArrowSideIcon" aria-hidden="true"></span> Wyszukaj
                        </p>
                    </div>
                    <SearchPanel></SearchPanel>
                </div>
            </div>
        );
    }
});

var LoginSideForm = React.createClass({
    getInitialState: function() {
        return {login: '', password: '', remember: false};
    },
    handleLoginChange: function(e) {
        this.setState({login: e.target.value});
    },
    handlePasswordChange: function(e) {
        this.setState({password: e.target.value});
    },
    handleRememberChange: function(e) {
        this.setState({ remember: e.target.value });
    },
    render: function () {
        return (
            <div className="LoginSideFormContainer col-md-12">
                <section id="loginForm loginFormCustom">
                    <div className="form-horizontal loggingForm">
                        <div className="form-group">
                            <div className="col-md-9 col-centered">
                                <input type="text" name="userNameInput" className="form-control" placeholder="Nazwa użytkownika..." value={this.state.login} onchange={this.handleLoginChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-9 col-centered">
                                <input type="password" name="passInput" className="form-control" placeholder="Hasło..." value={this.state.password} onchange={this.handlePasswordChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12 col-md-9 col-centered">
                                <div className="checkbox-inline">
                                    <label>
                                        <input type="checkbox" name="rememberCheckbox" checked={this.state.remember} onChange={this.handleRememberChange} /> Zapamiętaj mnie!
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-12 col-centered">
                                <button type="submit" className="btn nekrobutton-green loginConfirmButton">
                                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>Zaloguj!
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="forgotPasswordLogin col-md-12">
                        <p>
                            <a href="/Account/ForgotPassword">Choroba, nie pamiętam hasła!</a>
                        </p>
                    </div>
                    <div className="loginErrorMessageContainer"></div>
                </section>
            </div>
        );
    }
});

var RegisterSideForm = React.createClass({
    getInitialState: function() {
        return {login: '', mail: '', password: '', passwordConfirm: ''};
    },
    handleLoginRegChange: function(e) {
        this.setState({login: e.target.value});
    },
    handleMailRegChange: function (e) {
        this.setState({ mail: e.target.value });
    },
    handlePasswordRegChange: function(e) {
        this.setState({password: e.target.value});
    },
    handlePasswordConfirmRegChange: function(e) {
        this.setState({ passwordConfirm: e.target.value });
    },
    render: function () {
        return (
            <div className="LoginSideFormContainer col-md-12">
                <div className="sideTitle sideRegisterText">
                    <p>Po rejestracji potwierdź klikając w link wysłany na podanego przez Ciebie maila.</p>
                </div>
                <div className="form-horizontal registrationForm">
                    <div className="form-group">
                        <div className="col-md-9 col-centered">
                            <input type="text" name="userNameRegInput" className="form-control" placeholder="Nazwa użytkownika..." value={this.state.login} onchange={this.handleLoginRegChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-9 col-centered">
                            <input type="text" name="mailRegInput" className="form-control" placeholder="Adres e-mail..." value={this.state.mail} onchange={this.handleMailRegChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-9 col-centered">
                            <input type="password" name="passwordRegInput" className="form-control" placeholder="Hasło..." value={this.state.password} onchange={this.handlePasswordRegChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-9 col-centered">
                            <input type="password" name="confirmPasswordRegInput" className="form-control" placeholder="Potwierdź hasło..." value={this.state.passwordConfirm} onchange={this.handlePasswordConfirmRegChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12 col-centered">
                            <button type="submit" className="btn nekrobutton-green registerConfirmButton">
                                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Rejestrujemy!
                            </button>
                        </div>
                    </div>
                </div>
                <div className="registerErrorMessageContainer"></div>
            </div>
        );
    }
});

var SideNavigation = React.createClass({
    render: function() {
        return (
            <div className="sideBar sideBarSection sideBarNavigationComponent">
                <div className="sideMenuTitle">
                    <h4>Nawiguj:</h4>
                </div>
                <div className="sideBarComponent">                  
                    <div className="mainNavigatorContainer">
                        <div className="mainNavigatorContainerAllItems">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var SidePanelMenu = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            model: this.props.model
        };
    },
    render: function() {
        return (
            <div className="sideBar sideBarSection sideBarMenuSection">               
                <div className="sideMenuTitle">
                    <h4>Menu boczne:</h4>
                </div>
                <SideContact></SideContact>
                {/*<SidePlazlist name={this.state.model.PlazlistName} code={this.state.model.PlazlistCode}></SidePlazlist>*/}
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
                    <p>
                        <span className="glyphicon glyphicon-triangle-left leftArrowSideIcon" aria-hidden="true"></span> Kontakt
                    </p>
                </div>
                <div className="sideBody">
                    <div className="sideBodySliderTitle">
                        <p>KONTAKT</p>
                    </div>
                    <div className="sideContactTitle">
                        nekro@nekroplaza.pl
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
                    <p>
                        <span className="glyphicon glyphicon-triangle-left leftArrowSideIcon" aria-hidden="true"></span> Plazlista
                    </p>
                </div>
                <div className="sideBody">
                    <div className="sideBodySliderTitle">
                        <p>PLAZLISTA</p>
                    </div>
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
                    <p>
                        <span className="glyphicon glyphicon-triangle-left leftArrowSideIcon" aria-hidden="true"></span> Ostatnie komentarze
                    </p>
                </div>
                <div className="sideBody">
                    <div className="sideBodySliderTitle">
                        <p>OSTATNIE KOMENTARZE</p>
                    </div>
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
                <a className="sideLastCommentAnchor" href={"/" + this.props.articleCode + "#detailsCommentSection"}>
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
                    <p>
                        <span className="glyphicon glyphicon-triangle-left leftArrowSideIcon" aria-hidden="true"></span> Losowe posty
                    </p>
                </div>
                <div className="sideBody">
                    <div className="sideBodySliderTitle">
                        <p>LOSOWE POSTY</p>
                    </div>
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
                                        <img src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy"/>
                                    </div>
                                    <div className="bannerPanelImageMainSide">
                                        <img src="/Content/images/ring.gif" data-src={this.props.imagePath} className="nekroLazy" />
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

var ConfigSideBar = React.createClass({
    propTypes: {
        admin: React.PropTypes.bool.isRequired,
        authenticated: React.PropTypes.bool.isRequired,
        isConfig: React.PropTypes.bool.isRequired,
    },
    render: function () {
        return (
            <div>
                {this.props.admin && this.props.authenticated && this.props.isConfig &&
                    <div className="sideBar sideBarSection sideConfigSection">
                        <div className="sideMenuTitle">
                            <h4>Konfiguracja:</h4>
                        </div>
                        <div className="sideBarComponent">
                            <div className="sideTitle sideConfigurationArticlesAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-cog leftArrowSideIcon" aria-hidden="true"></span> Artykuły
                                </p>
                            </div>
                        </div>
                        <div className="sideBarComponent">
                            <div className="sideTitle sideConfigurationUsersAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-cog leftArrowSideIcon" aria-hidden="true"></span> Użytkownicy
                                </p>
                            </div>
                        </div>
                        <div className="sideBarComponent">
                            <div className="sideTitle sideConfigurationCategoriesAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-cog leftArrowSideIcon" aria-hidden="true"></span> Kategorie
                                </p>
                            </div>
                        </div>
                        <div className="sideBarComponent">
                            <div className="sideTitle sideConfigurationRolesAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-cog leftArrowSideIcon" aria-hidden="true"></span> Role
                                </p>
                            </div>
                        </div>
                        <div className="sideBarComponent">
                            <div className="sideTitle sideConfigurationGalleryAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-cog leftArrowSideIcon" aria-hidden="true"></span> Galeria
                                </p>
                            </div>
                        </div>
                        <div className="sideBarComponent">
                            <div className="sideTitle sideConfigurationSiteSettingsAnchor">
                                <p>
                                    <span className="glyphicon glyphicon-cog leftArrowSideIcon" aria-hidden="true"></span> Ustawienia
                                </p>
                            </div>
                        </div>
                    </div>
                }   
            </div>
        );
    }
});