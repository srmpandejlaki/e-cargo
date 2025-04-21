import React from 'react';
import NotesBody from './notes-body';
import ArchiveButton from './archive-button';
import PropTypes from 'prop-types';

function ArchiveItem({ title, body, id, createdAt, onUnarchive, onDelete }) {
  return (
    <div className='note-item'>
      <NotesBody id={id} title={title} body={body} createdAt={createdAt}></NotesBody>
      <ArchiveButton id={id} onUnarchive={onUnarchive} onDelete={onDelete} ></ArchiveButton>
    </div>
  );
};

ArchiveItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ArchiveItem;