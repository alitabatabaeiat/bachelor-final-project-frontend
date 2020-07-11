import * as UserAction from './UserAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  name: 'سید علی طباطبایی آل طه',
  avatar: '/images/avatars/avatar_11.png',
  role: 'manager'
};

const apartmentsReducer = baseReducer(initialState, {
  [UserAction.CHANGE_ROLE](state) {
    return {
      ...state,
      role: state.role === 'manager' ? 'resident' : 'manager'
    }
  }
});

export default apartmentsReducer;
