//var data = [
//  { Id: 1, Author: "Daniel Lo Nigro", Text: "Hello ReactJS.NET World!" },
//  { Id: 2, Author: "Pete Hunt", Text: "This is one comment" },
//  { Id: 3, Author: "Jordan Walke", Text: "This is *another* comment" }
//];

//routeJS
var urlD = Router.action('Articles', 'IndexReact');

var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
                console.log("SUKCES ", data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    //getInitialState: function() {
    //    return {
    //        data: null
    //    };
    //},
  componentDidMount: function() {
    this.loadCommentsFromServer();
    //window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.url.data} />
      </div>
    );
  }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.url.data.map(function(comment) {
            return (
              <Comment name={comment.name} key={comment.id}>{comment.name}
              </Comment>
      );
    });
    return (
      <div className="commentList">{commentNodes}
      </div>
        );
    }
});

//var Comment = React.createClass({
//    render: function() {
//        return (
//            <div className="commentContainer">
    //                <div className='commentAuthor'>{this.props.author}</div>
    //                <div className='commentText'>{this.props.children}</div>
    //</div>);
//    }
//});

var Comment = React.createClass({
    render: function() {
        return (
          <div className="comment">
            <h2 className="commentName">{this.props.name}
            </h2>
          </div>
      );
    }
});

ReactDOM.render(
    <CommentBox url={urlD} />,
  document.getElementById('componentDemo')
);