import React from 'react';
import { showFormattedDate } from '../utils/index';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NotesBody({ id, title, body, createdAt }) {
  return (
    <div>
      <Link to={`/note/${id}`} className='title'>{title}</Link>
      <p className='body'>{body}</p>
      <p className='createdAt'>{showFormattedDate(createdAt)}</p>
    </div>
  );
}

NotesBody.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NotesBody;
