import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'


const Navbar = ({isAuthenticated, logout}) => {
   const authLinks = (
      <ul>
      <li>
         <Link to="/dashboard">Dash</Link>
      </li>

      <li>
         <Link to="/" onClick={logout}><i class="fas fa-sign-out-alt"></i></Link>
      </li>
   </ul>
   )

   const guestLinks = (
      <ul>
      <li>
         <Link to="/">Home</Link>
      </li>
      <li>
         <Link to="/register">Register</Link>
      </li>
      <li>
         <Link to="/login">Login</Link>
      </li>
   </ul>
   )

   return (
      <div>
         Welcome to studyBuddy! 
         {isAuthenticated? authLinks : guestLinks}
      </div>
   );
};

Navbar.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{logout})(Navbar);
