var SubCategoryPanel = React.createClass({
    propTypes: {
        sub: React.PropTypes.array,
        isAjaxRequest: React.PropTypes.bool
    },
    getInitialState: function () {
        return {
            sub: this.props.sub,
            isAjaxRequest: this.props.isAjaxRequest
        };
    },
    render: function () {
        var subcategoryNodes = this.state.sub.map(function (subcategory) {
            return <SubCategoryPanelElement name={subcategory }></SubCategoryPanelElement>;
        }, true);
        return (
            <div className="categoryDetailContainer">
                <div className="categorySubContainer">
                    <div className="categorySubElement">Wszystkie
                    </div>
                    {subcategoryNodes}
                </div>
                {this.state.isAjaxRequest &&
                    <div className="navigationBackButton navigationBackButtonCategory">
                        <button type="button" className="btn nekrobutton-green btn-m">
                            <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span> POWRÓT
                        </button>
                    </div>
                }
            </div>
            );
    }
});

var SubCategoryPanelElement = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },
    render: function () {
        return (
            <div className="categorySubElement">
                {this.props.name}
            </div>
            );
    }
});