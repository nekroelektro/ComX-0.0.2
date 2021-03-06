﻿var Details = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        admin: React.PropTypes.bool.isRequired,
        decodedBody: React.PropTypes.string.isRequired
    },
    getInitialState: function () {
        return {
            model: this.props.model,
            admin: this.props.admin,
            dBody: this.props.decodedBody
        };
    },
    render: function () {
        return (
            <div className="articleDetails">
                {this.state.admin == 1 &&
                    <AdminPanel id={this.state.model.Id} isDiary={this.state.model.IsDiary}></AdminPanel>
                }
                <TopDetailPanel name={this.state.model.Name} category={this.state.model.Category} subcategory={this.state.model.Subcategory} date={this.state.model.Date} author={this.state.model.UserName} series={this.state.model.Series} imagePath={this.state.model.ImageUrl} isDiary={this.state.model.IsDiary}></TopDetailPanel>
                <MainArticleDetails dBody={this.state.dBody} prelude={this.state.model.Prelude} body={this.state.model.Body} code={this.state.model.CodedName} isDiary={this.state.model.IsDiary} label={this.state.model.Label} genre={this.state.model.Genre} catalog={this.state.model.CatalogueNumber} albumYear={this.state.model.AlbumYear} releaseYear={this.state.model.ReleaseYear}></MainArticleDetails>
            </div>
		);
    }
});

var AdminPanel = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        isDiary: React.PropTypes.bool
    },
    render: function () {
        return (
            <div className="topDetailPanel">
                <div className="topDetailPanelButtons container">
                    <a href={'/Configuration/Articles'}>
                        <button type="button" className="btn nekrobutton-blue btn-sm">
                            <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>DO KONFIGURACJI
                        </button>
                    </a>
                    <a href={'/'}>
                        <button type="button" className="btn nekrobutton-blue btn-sm">
                            <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>DO GŁÓWNEJ
                        </button>
                    </a>
                    <a href={'/Articles/Edit' + '?createMode=false&id=' + this.props.id + '&isDiary=' + this.props.isDiary}>
                        <button type="button" className="btn nekrobutton-green btn-sm">
                            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>EDYTUJ
                        </button>
                    </a>
                    <a className="popupDocumentDelete">
                        <button type="button" className="btn nekrobutton-red btn-sm">
                            <span className="glyphicon glyphicon-erase" aria-hidden="true"></span>USUŃ
                        </button>
                    </a>
                </div>
                <div id="delDoc-modal" className="white-popup wide-popup">
                    <h4>Wnimańje! Próbujesz usunąć artykuł!</h4>
                    <hr />
                    <p>Czy jesteś pewien? Takaż operacja jest nieodwracalna (no, może bardzo trudno odwracalna).</p>
                    <div className="form-group">
                        <div className="delDocButtons">
                            <button type="submit" className="btn nekrobutton-red submitDeleteDocumentForm" data-id={this.props.id} data-diary={this.props.isDiary}>
                                <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Usuń artykuł!
                            </button>
                            <button type="button" className="btn nekrobutton-blue .btn-sm btnCancelDelete shutNekroPop">Anuluj</button>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
});

var TopDetailPanel = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        category: React.PropTypes.string,
        subcategory: React.PropTypes.string,
        date: React.PropTypes.string,
        series: React.PropTypes.string,
        author: React.PropTypes.string,
        imagePath: React.PropTypes.string,
        isDiary: React.PropTypes.bool
    },
    render: function () {
        return (
            <div className="detailsBannerPanel" id="Start" data-isnavpanel="true">
                <div className="detailsImageAbsoluteBackground">
                    <div className="bannerPanelImageContainer">
                        <img src={this.props.imagePath} />
                    </div>
                    <div className="imageOverlayColor"></div>
                </div>
                <div className="bannerPanelImageMain bannerPanelDetailsMainImage">
                    <img src={this.props.imagePath} />
                </div>
                <div className="bannerPanelInfo">
                    <h3 className="bannerSeriesTitle">{this.props.series}</h3>
                    <h2 className="bannerArticleName">{this.props.name}</h2>
                    <div className="datesDetailsArticles">
                        <p>
                            <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.props
                            .author} &nbsp;&nbsp;&nbsp;&nbsp; <span className="glyphicon glyphicon-time" aria-hidden="true"></span> {this.props
                            .date} &nbsp;&nbsp;&nbsp;&nbsp;
                            {this.props.isDiary != 1 &&
                            <span>
                                <span className="glyphicon glyphicon-tags" aria-hidden="true"></span> {this.props
                                .category}
                                    , {this.props.subcategory}
                                </span>
                            }
                        </p>
                        <input id="categoryNameContainer" type="hidden" value={this.props.category} />
                    </div>
                </div>
            </div>
        );
    }
});

var MainArticleDetails = React.createClass({
    propTypes: {
        prelude: React.PropTypes.string,
        body: React.PropTypes.string,
        isDiary: React.PropTypes.bool,
        label: React.PropTypes.string,
        genre: React.PropTypes.string,
        catalog: React.PropTypes.string,
        albumYear: React.PropTypes.string,
        releaseYear: React.PropTypes.string,
        code: React.PropTypes.string,
        dBody: React.PropTypes.string
    },
    render: function () {
        var isDiary = this.props.isDiary;
        return (
            <div className="detailContainer">
                <div className="articleDetail">
                    {!isDiary ?
                    (
                            <div className="articleDetailsIntro" id="Artykuł" data-isnavpanel="true">
                        <div dangerouslySetInnerHTML={{__html: this.props.prelude}} />
                    </div>
                    ) : (
                            <div className="diaryElementsContainer" id="Pamiętnik" data-isnavpanel="true">
                            <b>Label: </b>{this.props.label}<br />
                            <b>Katalog: </b>{this.props.catalog}<br />
                            <b>Rok produkcji: </b>{this.props.albumYear}<br />
                            <b>Rok wydania: </b>{this.props.releaseYear}<br />
                            <b>Gatunek: </b>{this.props.genre}<br />
                    <br />
                        </div>
                    )
                    }
                    <div className="articleDetailsBody">
                        <div dangerouslySetInnerHTML={{__html: this.props.dBody}} />
                    </div>
                </div>
            </div>
        );
    }
});
