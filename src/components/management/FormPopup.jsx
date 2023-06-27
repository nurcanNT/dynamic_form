import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openPopup, closePopup } from '../../actions/actions';
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap stil dosyasını ekleyin
import './management.css'; // Özel stil dosyanızı ekleyin (örneğin, styles.css)
import '../../store.js';
import FormList from './FormList';

const FormPopup = () => {
  const showPopup = useSelector((state) => state.showPopup);
  const dispatch = useDispatch();

  const handleOpenPopup = () => {
    dispatch(openPopup());
  };

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  return (
   <></>
  );
};

export default FormPopup;
