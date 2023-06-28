// reducers/formReducer.js

const initialState = {
    fields: [], // Form alanları
    data: {}, // Form verileri
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FORM_FIELDS':
        return {
          ...state,
          fields: action.payload,
        };
      case 'SET_FORM_DATA':
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  