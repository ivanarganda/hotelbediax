import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CountriesContext } from '../context/countries';
import { FormContext } from '../context/form';
import { MsgContext } from '../context/message';
import useFadeIn from '../hooks/useFadeIn';
import types from '../utils/types.json';
import icons from '../utils/icons.json';
import useUrls from '../hooks/useUrls';

const Form = React.memo(() => {
  const { useMessage } = useContext(MsgContext);
  const { countries } = useContext(CountriesContext);
  const { contentForm, getData, changeType, type, openedModal, setOpenedModal } = useContext(FormContext);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const Section = useFadeIn();
  const { urls } = useUrls();
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (openedModal) {
      if (type === 'update') {
        setValue('id', contentForm?.id);
        setValue('name', contentForm?.destination_name);
        setValue('description', contentForm?.description);
        setValue('country_code', `${contentForm?.country_code}`);
        setValue('type', contentForm?.type);
      } else {
        resetForm();
      }
      setIsFormReady(true);
    }
  }, [type, setValue, contentForm, openedModal]);

  const resetForm = () => {
    setValue('id', '');
    setValue('name', '');
    setValue('description', '');
    setValue('country_code', '');
    setValue('type', '');
  };

  const renderCountriesOptions = () => (
    countries.map(country => (
      <option key={country?.country_code} value={country?.country_code}>
        {country?.country}
      </option>
    ))
  );

  const onSubmit = async (data) => {
    if (!data.name || !data.country_code || !data.type) {
      useMessage('Complete required fields in the form', 'error', 2000, 'top', 'center');
      return;
    }

    console.log('Form submitted:', data);
    const action = type === 'update' ? 'update' : 'create';
    try {
      const response = await fetch(`${urls.ws}/destinations/${action}`, {
        method: type === 'update' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const data_response = await response.json();
      console.log(data_response);
      useMessage(`Destination ${type === 'update' ? `with ID ${data.id} ` : ''}${action}d successfully`, 'success', 2000, 'top', 'center');
      setOpenedModal(false);
      resetForm();
      getData({});
    } catch (error) {
      useMessage('Error submitting the form', 'error', 2000, 'top', 'center');
    }
  };

  const renderInput = (id, label, required = false) => (
    (id !== 'id' && 
      <div>
      <label className='block text-sm font-medium text-gray-700' htmlFor={id}>
        {label} {required && '*'}
      </label>
      <input
        type='text'
        id={id}
        {...register(id, { required })}
        className={`mt-1 p-1 outline-none block w-full border ${errors[id] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      />
      {errors[id] && <p className='text-red-500 text-xs mt-1'>{label} is required</p>}
    </div>
    )
  );

  const renderSelect = (id, label, options, required = false, defaultValue = '') => (
    <div>
      <label className='block text-sm font-medium text-gray-700' htmlFor={id}>
        {label} {required && '*'}
      </label>
      <select
        id={id}
        {...register(id, { required })}
        defaultValue={defaultValue}
        className={`mt-1 block p-1 outline-none w-full border ${errors[id] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      >
        <option value=''>Select a {label.toLowerCase()}</option>
        {options}
      </select>
      {errors[id] && <p className='text-red-500 text-xs mt-1'>{label} is required</p>}
    </div>
  );

  return (
    openedModal && isFormReady && (
      <div className='fixed z-30 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <Section>
          <div className='relative bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl'>
            <button
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition duration-150'
              onClick={() => {
                setOpenedModal(false);
                changeType('');
                getData({});
              }}
              dangerouslySetInnerHTML={{ __html: icons.Xcircle }}
            />
            <h2 className='text-2xl text-gray-500 font-bold mb-6'>{type === 'update' ? 'Update Destination' : 'Create Destination'} ({contentForm?.id})</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-6'>
              {type === 'update' && renderInput('id', 'ID')}
              {renderInput('name', 'Name', true)}
              {renderSelect('country_code', 'Country', renderCountriesOptions(), true, type === 'update' ? contentForm?.country_code : '')}
              <div className='col-span-2'>
                <label className='block text-sm font-medium text-gray-700' htmlFor='description'>
                  Description
                </label>
                <textarea
                  id='description'
                  {...register('description')}
                  rows='3'
                  className='mt-1 p-1 outline-none block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
              </div>
              {renderSelect('type', 'Type', types?.map(item => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              )), true, type === 'update' ? contentForm?.type : '')}
              <div className='col-span-2 flex justify-end'>
                <button
                  type='submit'
                  className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {type === 'update' ? 'Save' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </Section>
      </div>
    )
  );
});

export default Form;
