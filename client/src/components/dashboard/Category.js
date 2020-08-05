import React from 'react'
import PropTypes from 'prop-types'

const Category = ({categories:{categoryName}}) => {
    return (
        <div>
            <h2>{categoryName}</h2>
        </div>
    )
}

Category.propTypes = {

}

export default Category
