var UserProfile = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        IsAdministrator: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        return {
            model: this.props.model,
            isAdmin: this.props.IsAdministrator
        };
    },
    render: function() {
        return (
            <div className="profileContainer">
                <div className="userPanelContainer">
                    <UserProfileAvatar model={this.state.model} isAdmin={this.state.isAdmin}></UserProfileAvatar>
                    <UserProfileInfo userName={this.state.model.UserName} dateRegistered={this.state.model
                                     .DateOfCreation} userMail={this.state.model.UserMail} commentCount={this.state.model.CommentsCount} isConfirmed={this.state.model.AccountConfirmed} isAdmin={this.state
                                     .isAdmin} ownProfile={this.state.model.IsOwnAccount} userRoles={this.state.model
                                     .Roles}></UserProfileInfo>
                    <UserProfileButtons isAdmin={this.state.isAdmin} model={this.state.model}></UserProfileButtons>
                    <UserProfileAdminPanel model={this.state.model} isAdmin={this.state
                                           .isAdmin}></UserProfileAdminPanel>
                </div>
            </div>
        );
    }
});

var UserProfileButtons = React.createClass({
    propTypes: {
        isAdmin: React.PropTypes.bool.isRequired,
        model: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <div className="userPanelButtons col-md-2">
                <a href={'/'}>
                    <button type="button" className="btn nekrobutton-blue .btn-sm profileHomePage">
                        <span className="glyphicon glyphicon-arrow-up userPanelBackButton" aria-hidden="true"></span>
                            DO GŁÓWNEJ
                    </button>
                </a>
                    {(this.props.isAdmin || this.props.model.IsOwnAccount) &&
                    <div>
                        <button type="button" className="btn nekrobutton-green .btn-sm profileEditDetails" href="#popupEditProfile">
                            <span className="glyphicon glyphicon-pencil userPanelEditButton" aria-hidden="true"></span>
                            EDYTUJ
                        </button>
                        <div id="popupEditProfile" className="mfp-hide white-popup">
                            <h3>Edytuj dane profilu</h3>
                            <hr />
                            <div className="col-xs-12">
                                <b>ADRES E-MAIL:</b>
                                <input type="text" name="userMailInput" className="form-control" value={this.props.model.UserMail} />
                            </div>
                            <div className="modalPopupButtons">
                                <button type="button" className="btn nekrobutton-green .btn-sm btnConfirmEdit" id="commId">
                                    Zapisz
                                </button>
                                <button type="button" className="btn nekrobutton-red .btn-sm btnCancelEdit">Anuluj</button>
                            </div>
                        </div>
                    </div>
                    }
</div>
        );
    }
});

var UserProfileInfo = React.createClass({
    propTypes: {
        userName: React.PropTypes.string,
        dateRegistered: React.PropTypes.string,
        commentCount: React.PropTypes.number,
        userMail: React.PropTypes.string,
        isConfirmed: React.PropTypes.bool,
        isAdmin: React.PropTypes.bool,
        ownProfile: React.PropTypes.bool,
        userRoles: React.PropTypes.string
    },
    render: function() {
        return (
            <div className="userProfileInfoContainer col-md-6">
                <div className="greetUserPanel">
                    <h2>Użytkownik: <b>{this.props.userName}</b></h2>
                </div>
                <div className="infoUserPanel">
                    <p>Zarejestrowany od: <b>{this.props.dateRegistered}</b></p>
                    <p>Rangi użytkownika: <b>{this.props.userRoles}</b></p>
                    <p>Napisał komentarzy: <b>{this.props.commentCount}</b></p>
                    {(this.props.ownProfile || this.props.isAdmin) &&
                        <div className="userProfileOwnSection">
                            <p>Mail użytkownika: <b id="userProfileMailAdress">{this.props.userMail}</b></p>
                            {!this.props.isConfirmed &&
                            <div>
                                <h4>Nie potwierdziłeś rejestracji linkiem z mejla!</h4>
                                <p>Nie dostałeś mejla? Kliknij <a className="reconfirmationLink" href="#">TUTEJ</a></p>
                            </div>
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
});

var UserProfileAvatar = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        isAdmin: React.PropTypes.bool.isRequired
    },
    render: function() {
        return (
            <div className="userProfileAvatarContainer">
                {this.props.model.AvatarExists
                ? (
                        <div className="userPanelAvatarSection col-md-4">
                            <div className="col-md-12 userPanelAvatarContainer">
                                <img src={"/Account/GetAvatar?userId=" + this.props.model.UserId} />
                            </div>
                            {(this.props.isAdmin || this.props.model.IsOwnAccount) &&
                            <div>
                            <div className="col-md-12 userPanelAvatarTitlesContainer">
                                <button type="button" className="btn nekrobutton-red btn-m popupUserDelete" data-id={this.props.model.UserId} href="#popupAvatarDelete">
                                    <span className="glyphicon glyphicon-erase" aria-hidden="true"></span> Usuń awatara
                                </button>
                            </div>
                            <div id="popupAvatarDelete" className="mfp-hide white-popup">
                                <h3>Potwierdź</h3>
                                <hr />
                                <p>Jesteś aby pewien, że życzeniem Twym jest usunięcie obecnego awatara?</p>
                                <button type="button" className="btn nekrobutton-green .btn-sm btnConfirmDeletionAvatar" id="commId">
                                    Ta!
                                </button>
                                <button type="button" className="btn nekrobutton-red .btn-sm btnCancelDeletion">Nope!</button>
                            </div>
                            </div>
                            }
                        </div>
                )
                : (
                        <div className="userProfileAvatarAddContainer col-md-4">
                            <h4>Dodaj sobie awatar!</h4>
                            <p>Info:</p>
                            <p>
                                Abyśmy sobie nie utrudniali życia - jest kilka warunków, które taki awatar spełnić musi, a są to kolejno:
                            </p>
                            <p>- musi mieć rozszerzenie .jpg albo .png albo i .gif</p>
                            <p>- najlepiej, żeby miał rozmiar do... powiedzmy 70kb, żeby nie śmiecił.</p>
                            <form className="avUpFormContainer form-horizontal">
                                <hr />
                                <div className="form-group">
                                    ZAŁADUJ FOTĘ:
                                    <div className="col-md-12">
                                        <input type="file" id="imgUp" name="avatar" accept=".gif, .jpg, .png" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <input id="userProfileAvatarUp" type="button" value="Ładuj!" className="btn nekrobutton-green" />
                                    </div>
                                </div>
                                <div className="editErrorContainer"></div>
                            </form>
                        </div>
                )
                }
            </div>
        );
    }
});

var UserProfileAdminPanel = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        isAdmin: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            roleList: this.props.model.RolesList,
            userId: this.props.model.UserId
        };
    },
    render: function() {
        var roleNodes = this.state.roleList.map(function(role) {
            return <option value={role.Text }>{role.Text}</option>;
        });
        return (
            <div className="userProfileAdministratorContainer">
                {this.props.isAdmin &&
                    <div>
                        <div className="userPanelAdministratorSection col-md-12">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    Dodaj rangę:
                                    <select name="RoleId" className="form-control">
                                        {roleNodes}
                                    </select>
                                </div>
                                <div className="form-group">
                                        <input type="button" id="addUserRangeSubmitButton" value="Dodaj!" className="btn nekrobutton-green" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-offset-2 col-md-12 userPanelBlockSection">
                            <button type="button" className="btn nekrobutton-red .btn-m popupUserDegrade" data-id={this.props.model.UserId} href="#popupUserDegrade">
                                <span className="glyphicon glyphicon-arrow-down userPanelBackButton" aria-hidden="true"></span> Zdegraduj do usera
                            </button>
                            <button type="button" className="btn nekrobutton-yellow btn-m popupUserBlock" data-id={this.props.model.UserId}
                                    href="#popupUserBlock">
                                <span className="glyphicon glyphicon-lock" aria-hidden="true"></span> {this.props.model.IsBlocked ? (<span>Odblokuj użykownika</span>):(<span>Zablokuj użykownika</span>)}
                            </button>
                            <button type="button" className="btn nekrobutton-red btn-m popupUserDelete" data-id={this.props.model.UserId}
                                    href="#popupUserDelete">
                                <span className="glyphicon glyphicon-erase" aria-hidden="true"></span> Usuń użytkownika
                            </button>
                        </div>
                        <div id="popupUserDelete" className="mfp-hide white-popup">
                            <p>Potwierdź</p>
                            <hr />
                            <p>Czy na bank chcesz usunąć tego użytkownika? (użytkownik będzie wypierdolony z bazy!)</p>
                            <div className="modalPopupButtons">
                                <button type="button" className="btn nekrobutton-green .btn-sm btnConfirmDeletion" id="commId">
                                    Zapisz
                                </button>
                                <button type="button" className="btn nekrobutton-red .btn-sm btnCancelDeletion">Anuluj</button>
                            </div>
                        </div>

                        <div id="popupUserBlock" className="mfp-hide white-popup">
                            <p>Potwierdź</p>
                            <hr />
                            <p>Czy na bank chcesz zablokować tego użytkownika?</p>
                            <div className="modalPopupButtons">
                                <button type="button" className="btn nekrobutton-green .btn-sm btnConfirmDeletion" id="commId">
                                    Zapisz
                                </button>
                                <button type="button" className="btn nekrobutton-red .btn-sm btnCancelDeletion">Anuluj</button>
                            </div>
                        </div>

                        <div id="popupUserDegrade" className="mfp-hide white-popup">
                            <p>Potwierdź</p>
                            <hr />
                            <p>Czy na bank chcesz zdegradować tego użytkownika do zwykłego usera?</p>
                            <div className="modalPopupButtons">
                                <button type="button" className="btn nekrobutton-green .btn-sm btnConfirmDegradation" id="commId">
                                    Zapisz
                                </button>
                                <button type="button" className="btn nekrobutton-red .btn-sm btnCancelDeletion">Anuluj</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
});