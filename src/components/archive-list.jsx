import React from 'react';
import ArchiveItem from './archive-item';
import PropTypes from 'prop-types';

function ArchiveList({ notes, onUnarchive, onDelete }) {
  return (
    <div className='archive-list'>
      {!notes.length ? (
        <p className='notes-empty-message'>Tidak ada catatan</p>
      ) : (
        notes.filter((note) => note.archived).map((note) => (
          <ArchiveItem key={note.id} {...note} onUnarchive={onUnarchive} onDelete={onDelete} id={note.id} />
        ))
      )}
    </div>
  );
}

ArchiveList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  })).isRequired,
  onUnarchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ArchiveList;
