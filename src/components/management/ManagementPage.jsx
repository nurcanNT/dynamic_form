import './management.css';
import React, { useState } from 'react';

const ManagementPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fields: []
  });

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormFields([]);
    setFormErrors({});
    setFormData({
      name: '',
      description: '',
      fields: []
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFieldChange = (index, e) => {
    const fields = [...formFields];
    fields[index] = { ...fields[index], [e.target.name]: e.target.value };
    setFormFields(fields);
  };

  const handleAddField = () => {
    setFormFields([...formFields, { required: false, name: '', dataType: '' }]);
  };

  const handleRemoveField = (index) => {
    const fields = [...formFields];
    fields.splice(index, 1);
    setFormFields(fields);
  };

  const handleSaveForm = () => {
    const errors = {};
    let hasError = false;

    if (formData.name.trim() === '') {
      errors.name = 'Form name is required.';
      hasError = true;
    }

    const updatedFields = formFields.map((field, index) => {
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

    const newForm = { ...formData, fields: updatedFields };

    // Formu localStorage'a kaydet
    const forms = JSON.parse(localStorage.getItem('forms')) || [];
    forms.push(newForm);
    localStorage.setItem('forms', JSON.stringify(forms));

    // Formu global state'e kaydetmek için gerekli işlemler buraya yazılabilir

    // Formu sıfırla ve popup'ı kapat
    handleClosePopup();
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Yeni Form Oluştur</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Yeni Form Oluştur</h2>
            <label>
              Form Adı:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <span className="error">{formErrors.name}</span>}
            </label>
            <label>
              Açıklama:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <h3>Form Alanları</h3>
            {formFields.map((field, index) => (
              <div key={index} className="field">
                <label>
                  Alan Adı:
                  <input
                    type="text"
                    name="name"
                    value={field.name}
                    onChange={(e) => handleFieldChange(index, e)}
                  />
                  {formErrors[`field-${index}-name`] && (
                    <span className="error">{formErrors[`field-${index}-name`]}</span>
                  )}
                </label>
                <label>
                  Veri Tipi:
                  <input
                    type="text"
                    name="dataType"
                    value={field.dataType}
                    onChange={(e) => handleFieldChange(index, e)}
                  />
                  {formErrors[`field-${index}-dataType`] && (
                    <span className="error">{formErrors[`field-${index}-dataType`]}</span>
                  )}
                </label>
                <button onClick={() => handleRemoveField(index)}>Alanı Kaldır</button>
              </div>
            ))}
            <button onClick={handleAddField}>Alan Ekle</button>
            <button onClick={handleSaveForm}>Kaydet</button>
            <button onClick={handleClosePopup}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementPage;
