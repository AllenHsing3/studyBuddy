import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

const Login = ({login, isAuthenticated}) => {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const { email, password } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      login(email, password)
   };

   if(isAuthenticated) return <Redirect to='/dashboard'/>

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
               name="password"
               type="password"
               value={password}
               onChange={(e) => onChange(e)}
               placeholder="Password"
            ></input>
            <button type="submit">Submit</button>
         </form>
      </div>
   );
};

Login.propTypes = {
   login: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);
