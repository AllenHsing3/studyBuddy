import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }
    return (
        <div>
            Welcome to studyBuddy
        </div>
    )
}

Landing.propTypes = {
 isAuthenticated: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {})(Landing)
