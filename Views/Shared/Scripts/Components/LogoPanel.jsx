var LogoPanel = React.createClass({
    propTypes: {
        admin: React.PropTypes.bool.isRequired,
        authenticated: React.PropTypes.bool.isRequired,
        model: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            admin: this.props.admin,
            auth: this.props.authenticated,
            userId: this.props.model.UserId,
            messagesCount: this.props.model.MessagesCount
        };
    },
    render: function () {
        return (
            <div className="topLogoPanel">
                <div className="logoSection">
                    <LogoMainImage></LogoMainImage>
                </div>
                <LoginRegisterModal></LoginRegisterModal>
            </div>
		);
    }
});

var LogoMainImage = React.createClass({
    render: function () {
        return (
            <div className="logo">
                <img id="logoImage" src='/Content/images/logoLogo.png' />
            </div>
            );
    }
});

var LoginRegisterModal = React.createClass({
    render: function () {
        return (
            <div id="login-modal" className="mfp-hide white-popup wide-popup">
                <a className="popupClose"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                <div id="loader"><img src="../../Content/images/loader.gif" /></div>
                <div className="loginContentInModal"></div>
            </div>
            );
    }
});

var RightLogoPanel = React.createClass({
    propTypes: {
        admin: React.PropTypes.bool.isRequired,
        auth: React.PropTypes.bool.isRequired,
        userId: React.PropTypes.string,
        messagesCount: React.PropTypes.number
    },
    render: function () {
        return (
            <div className="rightLogoPanel">
                <div className="logoMenu">
                    <SearchPanel></SearchPanel>
                    <div className="logoSearch logoComponent">
                        <a className="topLogoLastAnchor logoComponentAnchor">
                            <div className="logoComponentIcon">
                                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </div>
                            <div className="logoComponentText">
                                SZUKAJ
                            </div>
                        </a>
                    </div>
                    {this.props.admin &&
                    <div className="logoConfiguration logoComponent">
                        <a className="topLogoLastAnchor logoComponentAnchor" href="/Configuration/Articles">
                            <div className="logoComponentIcon">
                                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </div>
                            <div className="logoComponentText">
                                KONFIGURACJA
                            </div>
                        </a>
                    </div>
                    }
                    {this.props.auth == 1 ?
                        (
                        <div className="topPanelLoggingButtons">
                            <div className="logoUserPanel logoComponent logoProfileImageComponent">
                                <a className="topLogoLastAnchor logoComponentAnchor logoProfileImageComponentAnchor" href="#">
                                    <div className="logoComponentIcon">
                                        {this.props.messagesCount != 0 &&
                                            <div className="logoComponentNotificator">
                                                {this.props.messagesCount}
                                            </div>
                                        }
                                        <img className="logoProfileImage" src={"/Account/GetAvatar?userId=" + this.props.userId} />
                                    </div>
                                    <div className="logoComponentText">
                                        <div>PROFIL</div><span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                                    </div>
                                    <div className="logoComponentProfileContextMenu">
                                        <p><a className="" href="/Account/UserPanel">Pokaż profil</a></p>
                                        <p><a className="" href="/Account/Messages">Prywatne wiadomości</a></p>
                                        <p><a className="logoLogoutAnchor" href="#">Wyloguj</a></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="topAccountUserModals">
                            <div className="logoRegistration logoComponent">
                                <a className="topLogoLastAnchor popupRegisterModal logoComponentAnchor" href="#login-modal">
                                    <div className="logoComponentIcon">
                                        <span className="glyphicon glyphicon-barcode" aria-hidden="true"></span>
                                    </div>
                                    <div className="logoComponentText">
                                        ZAREJESTRUJ
                                    </div>
                                </a>
                            </div>
                            <div className="logoLogin logoComponent">
                                <a className="topLogoLastAnchor popupLoginModal logoComponentAnchor" href="#login-modal">
                                    <div className="logoComponentIcon">
                                        <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                                    </div>
                                    <div className="logoComponentText">
                                        ZALOGUJ
                                    </div>
                                </a>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
            );
    }
});
