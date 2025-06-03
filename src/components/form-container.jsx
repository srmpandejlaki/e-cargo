import React from 'react';
import PropTypes from 'prop-types';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namaBarang: '',
      daerahAsal: '',
      daerahTujuan: '',
      totalBiaya: '',
    };

    this.kotaOptions = ['Kairagi', 'Malalayang', 'Kombos', 'Wanea'];
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { namaBarang, daerahAsal, daerahTujuan, totalBiaya } = this.state;

    if (!daerahAsal || !daerahTujuan) {
      alert('Kota asal dan tujuan harus dipilih!');
      return;
    }

    this.props.addNotes({ namaBarang, daerahAsal, daerahTujuan, totalBiaya });
    this.setState({
      namaBarang: '',
      daerahAsal: '',
      daerahTujuan: '',
      totalBiaya: '',
    });
  };

  render() {
    const { namaBarang, daerahAsal, daerahTujuan, totalBiaya } = this.state;

    return (
      <div className="form-container">
        <h1>Form Pengiriman Barang</h1>
        <form onSubmit={this.handleSubmit}>
          <section className="form-input">
            <input
              type="text"
              name="namaBarang"
              placeholder="Nama Barang"
              value={namaBarang}
              onChange={this.handleInputChange}
              required
            />

            <select
              name="daerahAsal"
              value={daerahAsal}
              onChange={this.handleInputChange}
              required
            >
              <option value="" disabled>-- Pilih Kota Asal --</option>
              {this.kotaOptions.map((kota) => (
                <option key={kota} value={kota}>
                  {kota}
                </option>
              ))}
            </select>

            <select
              name="daerahTujuan"
              value={daerahTujuan}
              onChange={this.handleInputChange}
              required
            >
              <option value="" disabled>-- Pilih Kota Tujuan --</option>
              {this.kotaOptions.map((kota) => (
                <option key={kota} value={kota}>
                  {kota}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="totalBiaya"
              placeholder="Total Biaya"
              value={totalBiaya}
              onChange={this.handleInputChange}
              required
              min="0"
            />
          </section>

          <button className="btn-form" type="submit">
            Simpan
          </button>
        </form>
      </div>
    );
  }
}

FormContainer.propTypes = {
  addNotes: PropTypes.func.isRequired,
};

export default FormContainer;
