var PrivateMessages = React.createClass({
    propTypes: {
        model: React.PropTypes.array.isRequired,
        isAdmininstrator: React.PropTypes.bool.isRequired
    },
    getInitialState: function () {
        return {
            model: this.props.model,
            isAdmin: this.props.isAdmininstrator
        };
    },
    render: function () {
        return (
            <div className="mainMessagesContainer" id="mainMessagesContainer">
                <ThreadList model={this.state.model}></ThreadList>
            </div>
		);
    }
});

var ThreadList = React.createClass({
    propTypes: {
        model: React.PropTypes.array
    },
    getInitialState: function () {
        return {
            model: this.props.model
        };
    },
    render: function () {
        var threadElementsNodes = this.state.model.map(function (thread) {
            return <ThreadElement model={thread }></ThreadElement>;
        });
        return (
            <div className="threadsContainer" id="Wiadomości" data-isnavpanel="true">
                <h3>Twoje wiadomości prywatne:</h3>
                <hr />
                <div className="sendMessageContainer col-xs-offset-1 col-xs-10">
			        <div className="popupSendMessageGet">
			            <h3>Odpowiedz na prywatną wiadomość:</h3>
			            <hr />
			            <b>TYTUŁ:</b>
			            <div className="form-group">
			                <div className="privateMessageInputBlock">
			                    <input type="text" id="editPrivateMessageTitle" name="editPrivateMessageTitle" maxlength="90" className="form-control" />
			                </div>
			            </div>
			            <b>TREŚĆ:</b>
			            <div className="form-group">
			                <div className="privateMessageTextAreaBlock">
			                    <textarea id="editPrivateMessageContainer" name="editPrivateMessageContainer" className="form-control"></textarea>
			                </div>
			            </div>
			            <div className="modalPopupButtons">
			                <button type="button" className="btn nekrobutton-green .btn-sm btnConfirmSendMessage">
			                    Wyślij
			                </button>
			                <button type="button" className="btn nekrobutton-red .btn-sm btnCancelSendMessage">Anuluj</button>
			            </div>
			        </div>
                </div>
			    {threadElementsNodes}
			    <a className="messageSuccessModalAnchor"></a>
			    <div id="messageSuccessModal2" className="white-popup">
			        <h3>Prywatna wiadomość wysłana!</h3>
			        <div className="modalPopupButtons">
                        <button type="button" className="btn nekrobutton-green .btn-sm btnMessageSendConfirmation shutNekroPop">Spoko</button>
			        </div>
			    </div>
			</div>
		);
    }
});

var ThreadElement = React.createClass({
    propTypes: {
        model: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            messages: this.props.model.Messages
        };
    },
    render: function () {
        var messageElementsNodes = this.state.messages.map(function (message) {
            return <MessageElement model={message}></MessageElement>;
        });
        return (
            <div className="threadElementNode col-xs-offset-1 col-xs-10" data-id={this.props.model.Id}>
                <div className="threadElementContainer col-xs-12" data-id={this.props.model.Id}>
                    <div className="threadElementLeft">
                        {!this.props.model.IsAllRead &&
                        <div className="threadElementNotificator">
                            <span>NOWE</span>
                        </div>
                            }
                        <div className="threadElementTitle">
                            <h4>{this.props.model.Name}</h4>
                        </div>
                    </div>
                    <div className="threadElementRight">
                        <div className="threadElementDate">
                            <h4>Zaczęty: {this.props.model.Date}</h4>
                        </div>
                    </div>
                    {!this.props.model.IsUserWithDeleted &&
                    <div className="threadElementButtons">
                        <button type="button" className="btn nekrobutton-green .btn-sm btnSendMessageInThread" href="#popupSendMessage" data-userto={this.props.model.UserWithId} data-isnew={false} data-threadid={this.props.model.Id} data-title={this.props.model.Name}>
                            ODPOWIEDZ W TYM WĄTKU
                        </button>
                        <button type="button" className="btn nekrobutton-blue .btn-sm btnSendMessageNewThread" href="#popupSendMessage" data-userto={this.props.model.UserWithId} data-isnew={true} data-threadid={null} data-title={this.props.model.Name}>
                            ODPOWIEDZ W NOWYM WĄTKU
                        </button>
                        </div>
                        }
                </div>
                {messageElementsNodes}
            </div>
            );
    }
});

var MessageElement = React.createClass({
    propTypes: {
        model: React.PropTypes.object
    },
    render: function () {
        return (
            <div className="messageElementContainer col-xs-12" data-id={this.props.model.Id}>
                <div className="messageElementLeft col-xs-3">
                    <div className="messageElementAuthor">
                        <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.props.model.Author}
                    </div>
                    <div className="messageElementAvatar">
                        <img src={"/Account/GetAvatar?userId=" + this.props.model.AuthorId}/>
                    </div>
                </div>
                <div className="messageElementRight col-xs-9">
                    <div className="messageElementDate">
                        <span><b>WYSŁANO: {this.props.model.Date}</b></span>
                    </div>
                    <div className="messageElementTitle">
                        <span><b>TEMAT: <i>{this.props.model.Title}</i></b></span>
                    </div>
                    <div className="messageElementBody">
                        <h4><div dangerouslySetInnerHTML={{__html: this.props.model.Body}} /> </h4>
                    </div>
                    </div>
            </div>
            );
    }
});
