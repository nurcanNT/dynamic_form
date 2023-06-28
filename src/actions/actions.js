// actions.js
import axios from "axios";
export const openPopup = () => ({
    type: 'OPEN_POPUP'
  });
  
  export const closePopup = () => ({
    type: 'CLOSE_POPUP'
  });
  
  export const setFormFields = (fields) => ({
    type: 'SET_FORM_FIELDS',
    payload: fields
  });
  
  export const setFormErrors = (errors) => ({
    type: 'SET_FORM_ERRORS',
    payload: errors
  });
  
  export const setFormData = (data) => ({
    type: 'SET_FORM_DATA',
    payload: data
  });
  
  export const resetForm = () => ({
    type: 'RESET_FORM'
  });
  
  export const addForm = (form) => {
    return {
      type: 'ADD_FORM',
      payload: form
    };
  };

  export const fetchForms = () => {
    return async (dispatch) => {
      try {
        // Forms API'sinden formları getir
        const response = await axios.get('API_URL/forms');
        const forms = response.data;
  
        // Forms state'ini güncelle
        dispatch({ type: 'FETCH_FORMS_SUCCESS', payload: forms });
      } catch (error) {
        // Hata durumunda
        dispatch({ type: 'FETCH_FORMS_ERROR', payload: error.message });
      }
    };
  };
  
  