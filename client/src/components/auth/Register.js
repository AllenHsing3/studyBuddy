import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {register} from '../../actions/auth'
import {setAlert} from '../../actions/alert'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


const Register = ({register, setAlert, isAuthenticated}) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
   });

   const { name, email, password, password2 } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
   const onSubmit = (e) => {
      e.preventDefault();
      if(password !== password2){
         setAlert('Passwords do not match', "danger")
      } else {
         register({name, email, password})
      }
   };

   if(isAuthenticated) return <Redirect to='/' />

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
               name="password"
               type="password"
               value={password}
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

Register.propTypes = {
    register:PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register, setAlert})(Register);
