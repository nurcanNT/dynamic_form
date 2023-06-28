import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  openPopup,
  closePopup,
  setFormFields,
  setFormErrors,
  setFormData,
  resetForm,
  fetchForms // Yeni eklenen aksiyon
} from '../../actions/formActions';
import FormList from './FormList';
import FormPopup from './FormPopup';
import './management.css';
import axios from 'axios';

const ManagementPage = () => {
  const showPopup = useSelector((state) => state.showPopup);
  const forms = useSelector((state) => state.forms); // Forms state'ini alın
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Sayfa yüklendiğinde formları getirmek için fetchForms aksiyonunu tetikleyin
    dispatch(fetchForms());
  }, [dispatch]);

  const handleOpenPopup = () => {
    dispatch(openPopup());
  };

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Form Ara..."
      />

      <button onClick={handleOpenPopup}>Yeni Form Oluştur</button>
      {showPopup && <FormPopup onClosePopup={handleClosePopup} />}
      <FormList forms={filteredForms} />
    </div>
  );
};

export default ManagementPage;
