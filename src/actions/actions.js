// actions.js

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
  