import { connect } from "react-redux";
import Link from "../components/Link.js";
import { setVisibilityFliter } from "../actions/index.js";

// 参数1 state 参数2 ownProps  自身的props
const mapStateToProps = (state, ownProps) => {
  return {
    active: state.visibilityFliter === ownProps.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFliter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;