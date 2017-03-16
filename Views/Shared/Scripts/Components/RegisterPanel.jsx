var RegisterPanel = React.createClass({
    render: function () {
        return (
            <div className="registrationContainer">
                <RegisterForm></RegisterForm>
            </div>
		);
    }
});

var RegisterForm = React.createClass({
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
            <div className="RegisterFormContainer">
                <h2 className="registerTopLabel">Zróbmy sobie konto...</h2>
                <p>Formularz pod spodem poprowadzi Cię przez żmudny proces rejestracji, doceń.</p>
                <p>Info:</p>
                <p>- po rejestracji potwierdź ją klikając w link wysłany na podanego przez Ciebie maila.</p>
		        <div className="form-horizontal">
                    <hr />
                    <div className="form-group">
                        <div className="col-md-8 col-md-offset-3">
                            <input type="text" name="userNameRegInput" className="form-control" placeholder="Nazwa użytkownika..." value={this.state.login} onchange={this.handleLoginRegChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-8 col-md-offset-3">
                            <input type="text" name="mailRegInput" className="form-control" placeholder="Adres e-mail..." value={this.state.mail} onchange={this.handleMailRegChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-8 col-md-offset-3">
                            <input type="password" name="passwordRegInput" className="form-control" placeholder="Hasło..." value={this.state.password} onchange={this.handlePasswordRegChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-8 col-md-offset-3">
                            <input type="password" name="confirmPasswordRegInput" className="form-control" placeholder="Potwierdź hasło..." value={this.state.passwordConfirm} onchange={this.handlePasswordConfirmRegChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
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