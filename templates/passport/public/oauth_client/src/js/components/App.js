import React from 'react';
import Header from "./Header";
import { useForm } from 'react-hook-form';

/**
 * @module OAClient-App
 * @category Auth
 * @subcategory client
 * @desc root for oauth_client app
 * found in src/js/components/app.js
 * @see [../index.js (linkback)]{@link module:OAClient-index}
 * @return {void}
 */

/**
 * @file
 */

export default (props) => {

  // NOTE: i had to use App to initialize my react-hook-form because it could only be used in a functional component
  const { register, getValues, setValue, handleSubmit, watch, errors, formState, setError, clearError, triggerValidation } = useForm({ mode: "onchange", criteriaMode: "all" });
  const form_data = { register, getValues, handleSubmit, setValue, errors, formState, setError, clearError, triggerValidation };
  props.store.form_data = form_data;

  return (
    <div>
      <Header {...props}/>
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}
