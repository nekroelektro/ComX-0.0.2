var ResetPassword = React.createClass({
    render: function () {
        return (
            <div className="resetPassContainer">
                <ResetPass></ResetPass>
            </div>
		);
    }
});

var ResetPass = React.createClass({
    getInitialState: function() {
        return { mail: '', password: '', passwordConfirm: ''};
    },
    handleMailChange: function(e) {
        this.setState({mail: e.target.value});
    },
    handlePasswordChange: function(e) {
        this.setState({password: e.target.value});
    },
    handlePasswordConfirmChange: function(e) {
        this.setState({ passwordConfirm: e.target.value });
    },
    render: function () {
        return (
            <div className="resetPassFormContainer">
                <div className="resetPassTopInfo">
                    <h2 className="resetPassTopLabel">Zresetuj hasło do swojego konta!</h2>
                    <p>
                        Jeśli nie masz konta <a href="/Account/Register/">ZAREJESTRUJ SIĘ</a>.
                    </p>
                </div>
		        <div className="row">
                    <div className="col-md-4 col-centered">
                        <section id="loginForm resetPassFormCustom">
                            <div className="form-horizontal loggingFormExternal">
                                <hr />
                                <div className="form-group">
                                    <div className="col-md-9 col-centered">
                                        <input type="text" name="userNameInputExternal" className="form-control" placeholder="Adres e-mail..." value={this.state.mail} onchange={this.handleMailChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-9 col-centered">
                                        <input type="password" name="passInputExternal" className="form-control" placeholder="Hasło..." value={this.state.password} onchange={this.handlePasswordChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-9 col-centered">
                                        <input type="password" name="passInputExternal" className="form-control" placeholder="Potwierdź hasło..." value={this.state.passwordConfirm} onchange={this.handlePasswordConfirmChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn nekrobutton-green resetPassConfirmButtonExternal">
                                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>Resetujemy!
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="resetPassErrorMessageContainerExternal"></div>
                        </section>
                    </div>
			    </div>
            </div>
		);
    }
});