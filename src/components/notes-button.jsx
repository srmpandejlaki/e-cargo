import React from 'react';
import PropTypes from 'prop-types';

function NotesButton({ id, onArchive, onDelete}) {
  return (
    <div className='btn-container'>
      <button className='btnArchive' onClick={() => onArchive(id)}>Archive</button>
      <button className='btnDelete' onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

NotesButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotesButton;