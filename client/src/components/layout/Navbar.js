import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
   return (
      <div>
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
      </div>
   );
};

Navbar.propTypes = {};

export default Navbar;
