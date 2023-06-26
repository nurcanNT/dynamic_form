import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; 

const FormList = () => {
  // localStorage'dan formları al
  const forms = JSON.parse(localStorage.getItem('forms')) || [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Form Adı</th>
          <th>Açıklama</th>
          <th>Oluşturma Tarihi</th>
          <th>Alan Sayısı</th>
        </tr>
      </thead>
      <tbody>
        {forms.map((form, index) => (
          <tr key={index}>
            <td>{form.name}</td>
            <td>{form.description}</td>
            <td>{form.createdAt}</td>
            <td>{form.fields.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormList;
