import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export default function useActionDispatch(actionCreators) {
  return bindActionCreators(actionCreators, useDispatch());
}
