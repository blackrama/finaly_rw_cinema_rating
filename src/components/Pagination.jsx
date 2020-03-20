import React from "react";
class Pagination extends React.Component {
  componentWillReceiveProps(props) {
    console.log("nextProps page", props.pages);
  }
  render() {
    return (
      <div>
        <div className="alert alert-primary">
          count of pages: {this.props.pages}
        </div>
        <div className="alert alert-primary">
          current page: {this.props.page}
        </div>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={this.props.prevMovie}
        >
          prev
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={this.props.nextMovie}
        >
          next
        </button>
      </div>
    );
  }
}
export default Pagination;
