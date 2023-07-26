import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormContainer, FormGroup, SubmitButton } from './Styles';

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('Por favor, insira um e-mail válido').required('O e-mail é obrigatório'),
  phone: yup.number().typeError('Por favor, insira apenas números').integer().positive(),
  message: yup.string(),
});

const Form = () => {
  const { handleSubmit, control, formState: {errors} } = useForm({ resolver: yupResolver(schema) });

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const onSubmit = (data) => {
    setFormData(data);
    localStorage.setItem('formData', JSON.stringify(data));
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label>Nome: <span>*</span></label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </FormGroup>

        <FormGroup>
          <label>E-mail: <span>*</span></label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </FormGroup>

        <FormGroup>
          <label>Telefone:</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </FormGroup>

        <FormGroup>
          <label>Mensagem:</label>
          <Controller
            name="message"
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
        </FormGroup>

        <SubmitButton type="submit">Enviar</SubmitButton>
      </form>

      {formData && (
        <div>
          <h2>Comentário:</h2>
          <p>Nome: {formData.name}</p>
          <p>E-mail: {formData.email}</p>
          {formData.phone && <p>Telefone: {formData.phone}</p>}
          {formData.message && <p>Mensagem: {formData.message}</p>}
        </div>
      )}
    </FormContainer>
  );
};

export default Form;