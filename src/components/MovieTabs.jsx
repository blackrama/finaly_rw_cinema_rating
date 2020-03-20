import React from "react";
// import { render } from "node-sass";
class MovieTabs extends React.Component {
  componentWillReceiveProps(nextProps, nextState) {
    console.log("willReseiveProps");
    console.log("nextProps sort_by", nextProps.sort_by);
    console.log("nextProps sort_by", this.props.sort_by);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { sort_by, updateSortBy } = this.props;

    const handleClick = value => () => {
      updateSortBy(value);
    };

    const getClassLink = value => {
      return `nav-link ${sort_by === value ? "active" : ""}`;
    };
    console.log("MOvieeTabs render");
    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            className={getClassLink("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            Popularity desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink("revenue.desc")}
            onClick={handleClick("revenue.desc")}
          >
            Reveny desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassLink("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            vote average desc
          </div>
        </li>
      </ul>
    );
  }
}
// const MovieTabs = props => {
// const { sort_by, updateSortBy } = props;
// const handleClick = value => () => {
//   updateSortBy(value);
// };
// const getClassLink = value => {
//   return `nav-link ${sort_by === value ? "active" : ""}`;
// };
// return (
//   <ul className="tabs nav nav-pills">
//     <li className="nav-item">
//       <div
//         className={getClassLink("popularity.desc")}
//         onClick={handleClick("popularity.desc")}
//       >
//         Popularity desc
//       </div>
//     </li>
//     <li className="nav-item">
//       <div
//         className={getClassLink("revenue.desc")}
//         onClick={handleClick("revenue.desc")}
//       >
//         Reveny desc
//       </div>
//     </li>
//     <li className="nav-item">
//       <div
//         className={getClassLink("vote_average.desc")}
//         onClick={handleClick("vote_average.desc")}
//       >
//         vote average desc
//       </div>
//     </li>
//   </ul>
// );
// };
export default MovieTabs;
