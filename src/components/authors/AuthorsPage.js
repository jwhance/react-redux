import React from "react";
import { connect } from 'react-redux';
import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import AuthorList from './AuthorList';
import { Redirect } from "react-router-dom";
import Spinner from '../common/Spinner';
import { toast } from "react-toastify";

class AuthorsPage extends React.Component {
    state = {
        redirectToAddAuthorPage: false
    };

    componentDidMount() {
        //debugger;
        if (this.props.courses.length === 0) {
            this.props.actions.loadCourses().catch(error => {
                alert('Loading courses failed ' + error);
            });
        }

        if (this.props.authors.length === 0) {
            this.props.actions.loadAuthors().catch(error => {
                alert('Loading authors failed ' + error);
            });
        }
    }

    /*
    handleDeleteCourse = course => {
        toast.success("Course deleted");
        this.props.actions.deleteCourse(course).catch(error => {
            toast.error("Delete failed: " + error.message, {autoClose: false});
        });
    };
    */

    handleDeleteAuthor = async (author, courses) => {
        
        try {
            //debugger; // #1
            if (courses.filter(course => course.authorId === author.id).length > 0){
                toast.error("Cannot delete an author with courses.  Delete the courses first.")
            } else {
                await this.props.actions.deleteAuthor(author);
                toast.success("Author deleted");
            }
        } catch (error) {
            console.log(error);
            //debugger;
            toast.error("Delete failed: " + error.message, { autoClose: false });
        }
    };


    render() {
        return (
            <>
                {this.state.redirectToAddAuthorsPage && <Redirect to="/authors" />}
                <h2>Authors</h2>
                {this.props.loading ? (<Spinner />) : (
                    <>
                        <button style={{ marginBottom: 20 }} className='btn btn-primary add-author' onClick={() => this.setState({ redirectToAddAuthorsPage: true })} >
                            Add Author
                            </button>
                        <AuthorList courses={this.props.courses} authors={this.props.authors} onDeleteClick={this.handleDeleteAuthor} />
                    </>
                )}
            </>
        );
    }
}

AuthorsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        courses:
            state.authors.length === 0 ? [] : state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(a => a.id === course.authorId).name
                };
            }),        
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);   // ()() is just two function calls.  The first () calls the 2nd ()