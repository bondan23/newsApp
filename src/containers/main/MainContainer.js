import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newsActions from '@redux/news/actions';
import MainView from './MainView';

const mapStateToProps = ({news}) => {
  return {
    news
  }
}

const mapDispatchToprops = (dispatch) => {
  return bindActionCreators(newsActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToprops)(MainView);
