import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadAllCategories } from '../../actions/category';
import Spinner from '../layout/Spinner';
import Category from './Category';

const Dashboard = ({
  loadAllCategories,
  category: { categories, loading },
}) => {
  useEffect(() => {
    loadAllCategories();
  }, []);
  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {categories.map((categories) => (
              <Category categories={categories} />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  loadAllCategories: PropTypes.func.isRequired,
  category: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { loadAllCategories })(Dashboard);
