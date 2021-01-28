import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';

import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    componentDidMount() {
        if (this.props.courses.length === 0) {
            this.props.actions.loadCourses().catch(error => {
                alert('Loading courses failed ' + error);
            });
        }

        if (this.props.authors.length === 0){
            this.props.actions.loadAuthors().catch(error => {
                alert('Loading authors failed ' + error);
            });        
        }
    }

    render() {
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
            </>
        );
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
};

function mapStateToProps(state){
    return {
        courses: 
            state.authors.length === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            };
        }),
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);   // ()() is just two function calls.  The first () calls the 2nd ()