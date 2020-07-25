import * as UserAction from './UserAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  name: 'سید علی طباطبایی آل طه',
  avatar: '/images/avatars/avatar_11.png',
  role: 'manager',
  currentApartment: {
    id: '-',
    title: 'هیچ آپارتمانی انتخاب نشده است'
  },
  currentUnit: {
    id: '-',
    title: 'هیچ واحدی انتخاب نشده است'
  }
};

const apartmentsReducer = baseReducer(initialState, {
  [UserAction.CHANGE_ROLE](state) {
    return {
      ...state,
      role: state.role === 'manager' ? 'resident' : 'manager'
    };
  },

  [UserAction.CHANGE_CURRENT_APARTMENT](state, action) {
    return {
      ...state,
      currentApartment: action.payload
    };
  },

  [UserAction.CHANGE_CURRENT_UNIT](state, action) {
    return {
      ...state,
      currentUnit: action.payload
    };
  }
});

export default apartmentsReducer;
