var CommentsBox = React.createClass({
	propTypes: {
		allArticles: React.PropTypes.array.isRequired
	},
	getInitialState: function() {
		return {
		    articles: this.props.allArticles
		};
	},
	render: function() {
		var commentNodes = this.state.articles.map(function (comment) {
			return <Comment author={comment.Name}>{comment.Prologue}</Comment>;
		});

		return (
			<div className="CommentsBox">
				<h1>Comments</h1>
				<ol className="commentList">{commentNodes}
				</ol>
			</div>
		);
	}
});

var Comment = React.createClass({
	propTypes: {
		author: React.PropTypes.object.isRequired
	},
	render: function() {
		return (
			<li>
				<strong>{this.props.author}</strong>{': '}{this.props.children}
			</li>
		);
	}
});


