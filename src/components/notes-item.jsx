import React from 'react';
import NotesBody from './notes-body';
import NotesButton from './notes-button';
import PropTypes from 'prop-types';

function NotesItem({ title, body, createdAt, id, onArchive, onDelete }) {
  return (
    <div className='note-item'>
      <NotesBody id={id} title={title} body={body} createdAt={createdAt}></NotesBody>
      <NotesButton id={id} onArchive={onArchive} onDelete={onDelete} ></NotesButton>
    </div>
  );
};

NotesItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotesItem;