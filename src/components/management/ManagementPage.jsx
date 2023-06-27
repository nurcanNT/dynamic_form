
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap stil dosyasını ekleyin
import './management.css'; // Özel stil dosyasınızı ekleyin (örneğin, styles.css)
import { useSelector, useDispatch } from 'react-redux';
import {
  openPopup,
  closePopup,
  setFormFields,
  setFormErrors,
  setFormData,
  resetForm
} from '../../actions/actions';
import FormList from './FormList';
import './FormPopup.jsx';
import '../../store.js';

const ManagementPage = () => {
  const showPopup = useSelector((state) => state.showPopup);
  const dispatch = useDispatch();

  const handleOpenPopup = () => {
    dispatch(openPopup());
  };

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Yeni Form Oluştur</button>
      {showPopup && <FormPopup onClosePopup={handleClosePopup} />}
      <FormList />
    </div>
  );
};


const FormPopup = ({ onClosePopup }) => {
  const [formFields, setFormFields] = useSelector([]);
  const [formErrors, setFormErrors] = useSelector({});
  const [formData, setFormData] = useSelector({
    name: '',
    description: '',
    fields: []
  });

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

    // Formu sıfırla ve popup'ı kapat
    setFormFields([]);
    setFormErrors({});
    setFormData({
      name: '',
      description: '',
      fields: []
    });
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
        {formErrors.name && <span className="error">{formErrors.name}</span>}
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
      <h3>Form Alanları</h3>
      {formFields.map((field, index) => (
        <div key={index} className="field">
          <div className="form-group">
            <label htmlFor={`fieldName-${index}`}>Alan Adı:</label>
            <input
              id={`fieldName-${index}`}
              type="text"
              name="name"
              value={field.name}
              onChange={(e) => handleFieldChange(index, e)}
              className="form-control"
            />
            {formErrors[`field-${index}-name`] && (
              <span className="error">{formErrors[`field-${index}-name`]}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor={`fieldDataType-${index}`}>Veri Tipi:</label>
            <input
              id={`fieldDataType-${index}`}
              type="text"
              name="dataType"
              value={field.dataType}
              onChange={(e) => handleFieldChange(index, e)}
              className="form-control"
            />
            {formErrors[`field-${index}-dataType`] && (
              <span className="error">{formErrors[`field-${index}-dataType`]}</span>
            )}
          </div>
          <button className="btn btn-danger" onClick={() => handleRemoveField(index)}>Alanı Kaldır</button>
        </div>
      ))}
      <button className="btn btn-success" onClick={handleAddField}>Alan Ekle</button>
      <button className="btn btn-primary" onClick={handleSaveForm}>Kaydet</button>
      <button className="btn btn-secondary" onClick={onClosePopup}>İptal</button>
    </div>
  </div>
  );
};

export default ManagementPage;
