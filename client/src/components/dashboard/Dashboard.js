import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadAllCategories } from '../../actions/category';
import Spinner from '../layout/Spinner';
import Category from './Category';
import NewCategory from './NewCategory';

const Dashboard = ({
  loadAllCategories,
  category: { categories, loading },
}) => {
  useEffect(() => {
    loadAllCategories();
  }, []);
  const [renderForm, toggleForm] = useState(false);
  return (
    <div>
        
      <h1>Welcome to your dashboard!</h1>
      {categories.length == 0 && !loading && (
        <NewCategory text={"Let's get started! Please make your first deck:"} />
      )}
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {categories.map((categories) => (
              <Category key={categories._id} categories={categories} />
            ))}
            <div>
            <button onClick={() => toggleForm(!renderForm)}>
              Add new deck
            </button>
            {renderForm && <NewCategory text={'Create a new deck:'} />}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  loadAllCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { loadAllCategories, })(Dashboard);
