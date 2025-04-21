import React from 'react';
import NotesItem from './notes-item';
import PropTypes from 'prop-types';

function NoteLists({ notes, onArchive, onDelete }) {
  console.log(notes);
  return (
    <div className='notes-list'>
      {!notes.length ? (
        <p className='notes-empty-message'>Tidak ada catatan</p>
      ) : (
        notes.filter((note) => !note.archived).map((note) => (
          <NotesItem key={note.id} {...note} onArchive={onArchive} onDelete={onDelete} id={note.id} />
        ))
      )}
    </div>
  );
}

NoteLists.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({ 
    id: PropTypes.string.isRequired, 
    archived: PropTypes.bool.isRequired 
  })).isRequired,
  onArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteLists;
