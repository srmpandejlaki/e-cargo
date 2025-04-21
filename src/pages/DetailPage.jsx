import React from 'react';
import { showFormattedDate, getNote } from '../utils/index';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailNote id={id} />;
}

class DetailNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const result = await getNote(this.props.id);
    if (!result.error) {
      this.setState({ note: result.data, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { note, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    
    if (!note) {
      return <p>Note is not found!</p>;
    }

    return (
      <div className='detail-page'>
        <p className='title'>{note.title}</p>
        <p className='body'>{note.body}</p>
        <p className='createdAt'>{showFormattedDate(note.createdAt)}</p>
      </div>
    );
  }
}

DetailNote.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailPageWrapper;
