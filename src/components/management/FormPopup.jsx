import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setFormFields,
  setFormErrors,
  setFormData,
  resetForm
} from '../../actions/formActions';

const FormPopup = ({ onClosePopup }) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    name: '',
    description: '',
    createdAt: '',
    fields: [
      { required: true, name: 'Ad', dataType: 'STRING' },
      { required: true, name: 'Soyad', dataType: 'STRING' },
      { required: false, name: 'Yaş', dataType: 'NUMBER' }
    ]
  });
  const [formErrors, setFormErrors] = useState({});
  
  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFields = [...formFields.fields];
    updatedFields[index][name] = value;
    setFormFields({ ...formFields, fields: updatedFields });
  };

  const handleSaveForm = () => {
    // Veri giriş kontrolü yapılması gerekiyor
    const errors = {};
    let hasErrors = false;

    // Zorunlu alanların kontrolü
    formFields.fields.forEach((field, index) => {
      if (field.required && !field.name.trim()) {
        errors[index] = 'Bu alan zorunludur.';
        hasErrors = true;
      }
    });

    // Hatalar varsa setFormErrors ile hata mesajlarını state'e kaydedin
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    // Hatalar yoksa form verilerini kaydetmek için Redux eylem oluşturucularını tetikleyin
    dispatch(setFormFields(formFields.fields));
    dispatch(setFormData(formFields));
    dispatch(resetForm());
    onClosePopup();
  };

  return (
    <div className="form-popup">
      <div className="form-popup-content">
        <h2>Yeni Form Oluştur</h2>
        <label htmlFor="name">Form Adı:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formFields.name}
          onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
        />

        <label htmlFor="description">Açıklama:</label>
        <textarea
          id="description"
          name="description"
          value={formFields.description}
          onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
        ></textarea>

        <label htmlFor="createdAt">Oluşturma Tarihi:</label>
        <input
          type="date"
          id="createdAt"
          name="createdAt"
          value={formFields.createdAt}
          onChange={(e) => setFormFields({ ...formFields, createdAt: e.target.value })}
        />

        <h3>Form Alanları</h3>
        {formFields.fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={`field-${index}`}>Alan Adı:</label>
            <input
              type="text"
              id={`field-${index}`}
              name="name"
              value={field.name}
              onChange={(e) => handleFieldChange(e, index)}
            />
            {formErrors[index] && <span className="error">{formErrors[index]}</span>}
          </div>
        ))}

        <button onClick={handleSaveForm}>Kaydet</button>
        <button onClick={onClosePopup}>İptal</button>
      </div>
    </div>
  );
};

export default FormPopup;
