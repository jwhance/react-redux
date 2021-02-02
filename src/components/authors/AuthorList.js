import React from "react";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";


//                    v-Destructuring props argument
const AuthorList = ({ courses, authors, onDeleteClick }) => (
    <table className="table">
        <thead>
            <tr>
                <th>Author</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {authors.map(author => {
                return (
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td>
                            <button className='btn btn-outline-danger' onClick={() => onDeleteClick(author, courses)}>
                                Delete
                </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

AuthorList.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default AuthorList;
