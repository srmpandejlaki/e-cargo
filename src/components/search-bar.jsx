import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };

    this.onSearchingEventHandler = this.onSearchingEventHandler.bind(this);
  }

  onSearchingEventHandler(event) {
    const keyword = event.target.value;
    this.setState({ keyword });

    if (this.props.onSearch) {
      this.props.onSearch(keyword);
    }
  }

  render() {
    return (
      <div className='search-bar'>
        <h3>Find Your Special Note</h3>
        <input
          type='text'
          placeholder='Search note...'
          value={this.state.keyword}
          onChange={this.onSearchingEventHandler}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
