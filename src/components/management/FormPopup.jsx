import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  openPopup,
  closePopup,
  setFormFields,
  setFormErrors,
  setFormData,
  resetForm,
  addForm // Yeni eklenen aksiyon
} from '../../actions/actions';

const FormPopup = ({ onClosePopup }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    createdAt: '',
    fields: []
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFieldChange = (index, e) => {
    const fields = [...formData.fields];
    fields[index] = { ...fields[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, fields });
  };

  const handleAddField = () => {
    setFormData({
      ...formData,
      fields: [
        ...formData.fields,
        { required: false, name: '', dataType: '' }
      ]
    });
  };
  

  const handleRemoveField = (index) => {
    const fields = [...formData.fields];
    fields.splice(index, 1);
    setFormData({ ...formData, fields });
  };

  const handleSaveForm = () => {
    const errors = {};
    let hasError = false;

    if (formData.name.trim() === '') {
      errors.name = 'Form name is required.';
      hasError = true;
    }

    const updatedFields = formData.fields.map((field, index) => {
      if (field.name.trim() === '') {
        errors[`field-${index}-name`] = 'Field name is required.';
        hasError = true;
      }
      if (field.dataType.trim() === '') {
        errors[`field-${index}-dataType`] = 'Data type is required.';
        hasError = true;
      }
      return field;
    });

    if (hasError) {
      setFormErrors(errors);
      return;
    }

    const newForm = { ...formData, createdAt: new Date().toISOString() };

    // Formu localstorage'a ve global state'e kaydetmek için addForm aksiyonunu tetikleyin
    dispatch(addForm(newForm));

    // Formu sıfırla ve popup'ı kapat
    setFormData({
      name: '',
      description: '',
      createdAt: '',
      fields: []
    });
    setFormErrors({});
    onClosePopup();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Yeni Form Oluştur</h2>
        <div className="form-group">
          <label htmlFor="name">Form Adı:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.name && (
            <span className="error">{formErrors.name}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Açıklama:</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Alanlar:</label>
          {formData.fields.map((field, index) => (
            <div key={index} className="field">
              <input
                type="text"
                name={`field-${index}-name`}
                value={field.name}
                onChange={(e) => handleFieldChange(index, e)}
                placeholder="Alan Adı"
                className="form-control"
              />
              {formErrors[`field-${index}-name`] && (
                <span className="error">
                  {formErrors[`field-${index}-name`]}
                </span>
              )}
              <input
                type="text"
                name={`field-${index}-dataType`}
                value={field.dataType}
                onChange={(e) => handleFieldChange(index, e)}
                placeholder="Veri Türü"
                className="form-control"
              />
              {formErrors[`field-${index}-dataType`] && (
                <span className="error">
                  {formErrors[`field-${index}-dataType`]}
                </span>
              )}
              <button onClick={() => handleRemoveField(index)}>Sil</button>
            </div>
          ))}
          <button onClick={handleAddField}>Alan Ekle</button>
        </div>
        <div className="form-group">
          <button onClick={handleSaveForm}>Kaydet</button>
          <button onClick={onClosePopup}>İptal</button>
        </div>
      </div>
    </div>
  );
};

export default FormPopup;
