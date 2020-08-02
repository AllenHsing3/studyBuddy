import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Register = (props) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password1: '',
      password2: '',
   });

   const { name, email, password1, password2 } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   const onSubmit = (e) => {
      e.preventDefault();
      // Add in redux later
      console.log(formData);
   };

   return (
      <div>
         <form onSubmit={(e) => onSubmit(e)}>
            <input
               name="name"
               type="text"
               value={name}
               onChange={(e) => onChange(e)}
               placeholder="Name"
            ></input>
            <input
               name="email"
               type="text"
               value={email}
               onChange={(e) => onChange(e)}
               placeholder="Email"
            ></input>
            <input
               name="password1"
               type="password"
               value={password1}
               onChange={(e) => onChange(e)}
               placeholder="Password"
            ></input>
            <input
               name="password2"
               type="password"
               value={password2}
               onChange={(e) => onChange(e)}
               placeholder="Please confirm password"
            ></input>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
};

Register.propTypes = {};

export default Register;
