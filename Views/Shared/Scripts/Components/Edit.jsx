var Edit = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
        isAdmin: React.PropTypes.bool.isRequired
    },
    getInitialState: function () {
        return {
            model: this.props.model,
            isAdmin: this.props.isAdmin
        };
    },
    render: function () {
        return (
            <div className="editContainer">
                {this.state.isAdmin &&
                    <EditForm model={this.state.model}></EditForm>
                }
            </div>
		);
    }
});

var EditForm = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
    },
    getInitialState: function () {
        return {
            categoryLists: this.props.model.Categories,
            isCreateMode: this.props.model.IsCreate,
            isDiary: this.props.model.Document.IsDiary,
            isPublished: this.props.model.Document.IsPublished,
            dateEdited: this.props.model.Document.DateEdited,
            id: this.props.model.Document.Id,
            name: this.props.model.Document.Name,
            body: this.props.model.Document.Body,
            label: this.props.model.Document.Label,
            albumYear: this.props.model.Document.AlbumYear,
            releaseYear: this.props.model.Document.ReleaseYear,
            genre: this.props.model.Document.Genre,
            catalogue: this.props.model.Document.CatalogueNumber,
            dateCreated: this.props.model.Document.DateCreated,
            prelude: this.props.model.Document.Prelude,
            author: this.props.model.Document.UserId,
            category: this.props.model.Document.CategoryId,
            subcategory: this.props.model.Document.SubCategoryId,
            series: this.props.model.Document.Series,
            description: this.props.model.Document.IndexDescription,
            articleImage: this.props.model.ArticleImage
        };
    },
    handleDateEditedChange: function (e) {
        this.setState({ dateEdited: e.target.value });
    },
    handleIsPublishedChange: function (e) {
        this.setState({ isPublished: e.target.value });
    },
    handleIsDiaryChange: function (e) {
        this.setState({ isDiary: e.target.value });
    },
    handleNameChange: function (e) {
        this.setState({ name: e.target.value });
    },
    handleBodyChange: function (e) {
        this.setState({ body: e.target.value });
    },
    handleLabelChange: function (e) {
        this.setState({ label: e.target.value });
    },
    handleAlbumYearChange: function (e) {
        this.setState({ albumYear: e.target.value });
    },
    handleReleaseYearChange: function (e) {
        this.setState({ releaseYear: e.target.value });
    },
    handleGenreChange: function (e) {
        this.setState({ genre: e.target.value });
    },
    handleCatalogueChange: function (e) {
        this.setState({ catalogue: e.target.value });
    },
    handleDescriptionChange: function (e) {
        this.setState({ description: e.target.value });
    },
    handlePreludeChange: function (e) {
        this.setState({ prelude: e.target.value });
    },
    handleCategoryChange: function (e) {
        this.setState({ category: e.target.value });
    },
    handleSubcategoryChange: function (e) {
        this.setState({ subcategory: e.target.value });
    },
    handleSeriesChange: function (e) {
        this.setState({ series: e.target.value });
    },
    render: function () {
        var categoryNodes = this.state.categoryLists[0].map(function (cat) {
            return <option value={cat.Text }>{cat.Text}</option>;
        });
        var subCategoryNodes = this.state.categoryLists[1].map(function (subCat) {
            return <option value={subCat.Text }>{subCat.Text}</option>;
        });
        var seriesNodes = this.state.categoryLists[2].map(function (ser) {
            return <option value={ser.Text }>{ser.Text}</option>;
        });
        var imagePresent = this.state.articleImage == "default.jpg" ? false : true;
        return (
            <div className="editFormSection">
            <form className="EditFormContainer">
                <div className="formCenteredLastElement">
                    {this.state.isCreateMode ?
                    (
                        <h2>Tworzysz teraz nowy artykuł, koleżko!</h2>
                    ) :
                    (
                        <h2>Edytujesz teraz swój artykuł!</h2>
                    )
                    }
                    <h3>INFO:</h3>
                    <h4>- Musisz uzupełnić WSZYSTKIE pola</h4>
                    <h4>- Wartości kategorii są domyślne (bierze pierwszą alfabetycznie) więc przed publikacją sprawdź, czy się zgadzają</h4>
                </div>
                <hr />
                <div className="editErrorContainer"></div>
                <input type="text" className="editArtIdInput hidden" disabled name="Id" value={this.state.id} />
                <input type="checkbox" name="IsCreate" className="hidden" disabled id="IsCreate" checked={this.state.isCreateMode} />
                <div className="form-horizontal">                   
                    {this.state.isCreateMode ?
                    (
                    <div className="form-group">
                        <div className="col-md-offset-1 col-md-10">
                            <div className="checkbox-inline">
                                <label>
                                    <input type="checkbox" name="IsDiary" id="IsDiary" checked={this.state.isDiary} onChange={this.handleIsDiaryChange} /> Czy to wpis do pamiętnika płytoholika?
                                </label>
                            </div>
                        </div>
                    </div>
                    ):(
                    <div className="editDatesInputs">
                        <div className="form-group">
                            <div className="col-md-offset-1 col-md-10">
                                <b>DATA UTWORZENIA ARTYKUŁU:</b>
                                <input type="text" name="DateCreated" className="form-control" disabled value={this.state.dateCreated} />
                                <input type="checkbox" name="IsDiary" className="hidden" id="IsDiary" checked={this.state.isDiary} onChange={this.handleIsDiaryChange} />
                            </div>
                        </div>
                        <div className="form-group articleCreateComponent">
                            <div className="col-md-offset-1 col-md-10">
                                <b>DATA OSTATNIEJ EDYCJI ARTYKUŁU:</b>
                                <input type="text" name="DateEdited" className="form-control" disabled value={this.state.dateEdited} onchange={this.handleDateEditedChange} />
                            </div>
                        </div>
                    </div>
                    )
                    }
                    <hr />
                    <div className="form-group">
                        <div className="col-md-offset-1 col-md-10">
                            <b>OBRAZEK:</b>
                                <div className="editImage">
                                    {!imagePresent || this.state.isCreateMode ?
                                    (
                                <div className="editUploadControl">
                                    <input type="file" id="imgUp" name="File" />
                                    <button type="button" id="clearUploadControlButton" className="btn nekrobutton-red hidden">
                                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Usuń obrazek
                                    </button>
                                </div>
                                    ) : (
                                <div className="editImageControl">
                                    <img className="editUploadedImage" src={this.state.articleImage} />
                                    <div className="buttons">
                                        <button type="button" id="clearImageControlButton" value={this.state.isDiary} className="btn nekrobutton-red">
                                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Usuń obrazek
                                        </button>
                                    </div>
                                </div>
                                    )
                                    }
                                </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-1 col-md-10">
                            <b>TYTUŁ:</b>
                            <input type="text" name="Name" className="form-control" value={this.state.name} onchange={this.handleNameChange} />
                        </div>
                    </div>
                    <div className="form-group articleCreateComponent">
                        <div className="col-md-offset-1 col-md-10">
                            <b>KRÓTKI OPIS:</b>
                            <textarea type="text" name="IndexDescription" id="IndexDescription" className="form-control articleEditor" value={this.state.description} onchange={this.handleDescriptionChange} />
                        </div>
                    </div>
                    <div className="form-group articleCreateComponent">
                        <div className="col-md-offset-1 col-md-10">
                            <b>WSTĘPNIAK:</b>
                            <textarea type="text" name="Prelude" id="Prelude" className="form-control articleEditor" value={this.state.prelude} onchange={this.handlePreludeChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-1 col-md-10">
                            <b>TREŚĆ ARTYKUŁU:</b>
                            <textarea type="text" name="Body" id="Body" className="form-control articleEditor" value={this.state.body} onchange={this.handleBodyChange} />
                        </div>
                    </div>
                    <div className="form-group articleCreateComponent">
                        <div className="col-md-offset-1 col-lg-10">
                            <b>KATEGORIA:</b>
                            <select name="CategoryId" className="form-control" value={this.state.category} onChange={this.handleCategoryChange}>
                                {categoryNodes}
                            </select>
                        </div>
                    </div>
                    <div className="form-group articleCreateComponent">
                        <div className="col-md-offset-1 col-lg-10">
                            <b>PODKATEGORIA:</b>
                            <select name="SubCategoryId" className="form-control" value={this.state.subcategory} onChange={this.handleSubcategoryChange}>
                                {subCategoryNodes}
                            </select>
                        </div>
                    </div>
                    <div className="form-group articleCreateComponent">
                        <div className="col-md-offset-1 col-lg-10">
                            <b>CYKL:</b>
                            <select name="Series" className="form-control" value={this.state.series} onChange={this.handleSeriesChange}>
                                {seriesNodes}
                            </select>
                        </div>
                    </div>
                    <div className="form-group diaryCreateComponent">
                        <div className="col-md-offset-1 col-md-10">
                            <b>LABEL:</b>
                            <input type="text" name="Label" className="form-control" value={this.state.label} onchange={this.handleLabelChange} />
                        </div>
                    </div>
                    <div className="form-group diaryCreateComponent">
                        <div className="col-md-offset-1 col-md-10">
                            <b>GATUNEK:</b>
                            <input type="text" name="Genre" className="form-control" value={this.state.genre} onchange={this.handleGenreChange} />
                        </div>
                    </div>
                    <div className="form-group diaryCreateComponent">
                        <div className="col-md-offset-1 col-md-10">
                            <b>ROK PRODUKCJI:</b>
                            <input type="text" pattern="[0-9]*" name="AlbumYear" className="form-control" value={this.state.albumYear} onchange={this.handleAlbumYearChange} />
                        </div>
                    </div>
                    <div className="form-group diaryCreateComponent">
                        <div className="col-md-offset-1 col-md-10">
                            <b>ROK WYDANIA:</b>
                            <input type="text" pattern="[0-9]*" name="ReleaseYear" className="form-control" value={this.state.releaseYear} onchange={this.handleReleaseYearChange} />
                        </div>
                    </div>
                    <div className="form-group diaryCreateComponent">
                        <div className="col-md-offset-1 col-md-10">
                            <b>NR KATALOGOWY:</b>
                            <input type="text" name="CatalogueNumber" className="form-control" value={this.state.catalogue} onchange={this.handleCatalogueChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-1 col-md-10">
                            <div className="checkbox-inline">
                                <label>
                                    <input type="checkbox" name="IsPublished" checked={this.state.isPublished} onChange={this.handleIsPublishedChange} /> OPUBLIKUJ
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <hr />
                    <div className="form-group formCenteredLastElement">
                        <button className="btn nekrobutton-green" id="submitArticleEditCreate">
                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> {this.state.isCreateMode ? ("Dodaj artykuł!") : ("Zaktualizuj artykuł!")}
                        </button>
                    </div>
        </div>
		);
    }
});