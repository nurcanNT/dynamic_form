// actions/formActions.js

// Form alanlarını ayarlamak için eylem oluşturucu
export const setFormFields = (fields) => {
  return {
    type: 'SET_FORM_FIELDS',
    payload: fields,
  };
};

// Form verilerini ayarlamak için eylem oluşturucu
export const setFormData = (data) => {
  return {
    type: 'SET_FORM_DATA',
    payload: data,
  };
};

export const resetForm = () => {
  return {
    type: 'RESET_FORM'
  };
};

export const fetchForms = () => {
  return {
    type: 'FETCH_FORMS'
  };
};

export const openPopup = () => {
  return {
    type: 'OPEN_POPUP'
  };
};

export const closePopup = () => {
  return {
    type: 'CLOSE_POPUP'
  };
};

