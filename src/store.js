// store.js
import { createStore } from 'redux';

// Başlangıç durumu (initial state)
const initialState = {
  showPopup: false,
  forms: [], // forms state'i eklendi
  formFields: [],
  formErrors: {},
  formData: {
    name: '',
    description: '',
    fields: []
  }
};

// Reducer fonksiyonu
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_POPUP':
      return {
        ...state,
        showPopup: true
      };
    case 'CLOSE_POPUP':
      return {
        ...state,
        showPopup: false
      };
    case 'SET_FORM_FIELDS':
      return {
        ...state,
        formFields: action.payload
      };
    case 'SET_FORM_ERRORS':
      return {
        ...state,
        formErrors: action.payload
      };
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: action.payload
      };
    case 'RESET_FORM':
      return {
        ...state,
        formFields: [],
        formErrors: {},
        formData: {
          name: '',
          description: '',
          fields: []
        }
      };
    case 'FETCH_FORMS': // FETCH_FORMS aksiyonu eklendi
      return {
        ...state,
        forms: action.payload
      };
    default:
      return state;
  }
};

// Store'u oluşturun
const store = createStore(reducer);

export default store;
