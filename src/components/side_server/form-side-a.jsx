import React from 'react';
import PropTypes from 'prop-types';

class FormSideAContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBarang: [
        {
          id: 1,
          namaBarang: 'Laptop',
          daerahAsal: 'Jakarta',
          daerahTujuan: 'Surabaya',
          totalBiaya: 500000,
          status: 'Sedang diproses',
        },
        {
          id: 2,
          namaBarang: 'Printer',
          daerahAsal: 'Bandung',
          daerahTujuan: 'Medan',
          totalBiaya: 750000,
          status: 'Sedang dalam pengiriman',
        },
      ],
    };

    this.statusOptions = [
      'Sedang diproses',
      'Sedang dalam pengiriman',
      'Sudah diterima',
    ];
  }

  handleStatusChange = (event, id) => {
    const newStatus = event.target.value;
    this.setState((prevState) => ({
      dataBarang: prevState.dataBarang.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      ),
    }));
  };

  handleUpdate = (id) => {
    const updatedItem = this.state.dataBarang.find((item) => item.id === id);
    if (this.props.addNotes && typeof this.props.addNotes === 'function') {
      this.props.addNotes(updatedItem);
    }
    alert(`Status barang "${updatedItem.namaBarang}" diperbarui ke "${updatedItem.status}"`);
  };

  render() {
    const { dataBarang } = this.state;

    return (
      <div className='form-container'>
        <h1>Data Pengiriman</h1>
        <table border='1' cellPadding='8' cellSpacing='0'>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Asal</th>
              <th>Tujuan</th>
              <th>Total Biaya</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataBarang.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.namaBarang}</td>
                <td>{item.daerahAsal}</td>
                <td>{item.daerahTujuan}</td>
                <td>{item.totalBiaya.toLocaleString()}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => this.handleStatusChange(e, item.id)}
                  >
                    {this.statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => this.handleUpdate(item.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

FormSideAContainer.propTypes = {
  addNotes: PropTypes.func.isRequired,
};

export default FormSideAContainer;
