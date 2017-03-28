var LoginPanel = React.createClass({
    render: function () {
        return (
            <div className="loginContainer">
                <LoginForm></LoginForm>
            </div>
		);
    }
});

var LoginForm = React.createClass({
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
            <div className="LoginFormContainer">
                <h2 className="loginTopLabel">Zaloguj się</h2>
                <p>
                    Podaj swoją nazwę użytkownika i hasło. Jeśli nie masz konta <a href="/Account/Register/">ZAREJESTRUJ SIĘ</a>.
                </p>
		        <div className="row">
                    <div className="col-md-12">
                        <section id="loginForm loginFormCustom">
                            <div className="form-horizontal">
                                <hr />
                                <div className="form-group">
                                    <div className="col-md-8 col-md-offset-3">
                                        <input type="text" name="userNameInput" className="form-control" placeholder="Nazwa użytkownika..." value={this.state.login} onchange={this.handleLoginChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-8 col-md-offset-3">
                                        <input type="password" name="passInput" className="form-control" placeholder="Hasło..." value={this.state.password} onchange={this.handlePasswordChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className="checkbox-inline">
                                            <label>
                                                <input type="checkbox" name="rememberCheckbox" checked={this.state.remember} onChange={this.handleRememberChange} /> Zapamiętaj mnie!
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn nekrobutton-green loginConfirmButton">
                                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>Zaloguj!
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="loginErrorMessageContainer"></div>
                            <div className="forgotPasswordLogin col-md-12">
                                <h4>
                                    <a href="/Account/ForgotPassword">Choroba, nie pamiętam hasła!</a>
                                </h4>
                            </div>
                        </section>
                    </div>
			    </div>
            </div>
		);
    }
});