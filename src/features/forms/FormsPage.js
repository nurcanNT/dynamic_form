import { useForm } from "react-hook-form";
import FormFieldArray from "./components/FormFieldArray";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    description: yup.string().required(),
    fields: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(),
          dataType: yup.string().required(),
        })
      )
      .required(),
  })
  .required();

const FormsPage = () => {
  const [formData, setFormData] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://picsum.photos/v2/list?limit=${formData.length}`
        );
        setImage(response.data);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, [formData.length]);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    reset();
    const updatedFormData = [...formData, data];
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    setFormData(updatedFormData);
  };

  return (
    <>
      {/* ... diğer bileşenler */}
    </>
  );
};

export default FormsPage;
