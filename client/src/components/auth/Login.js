import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
   const [formData, setFormData] = useState({
      email: '',
      password1: '',
   });

   const { email, password1 } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      //Add in redux action here
      console.log(formData);
   };

   return (
      <div>
         <form onSubmit={(e) => onSubmit(e)}>
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
            <button type="submit">Submit</button>
         </form>
      </div>
   );
};

Login.propTypes = {};

export default Login;
