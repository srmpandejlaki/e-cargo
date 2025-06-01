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

    this.kotaOptions = [
      'Kairagi',
      'Malalayang',
      'Kombos',
      'Wanea',
    ];
  }

  onNamaBarangChangeEventHandler = (event) => {
    this.setState({ namaBarang: event.target.value });
  };

  ondaerahAsalChangeEventHandler = (event) => {
    this.setState({ daerahAsal: event.target.value });
  };

  ondaerahTujuanChangeEventHandler = (event) => {
    this.setState({ daerahTujuan: event.target.value });
  };

  onTotalBiayaChangeEventHandler = (event) => {
    this.setState({ totalBiaya: event.target.value });
  };

  onSubmitEventHandler = (event) => {
    event.preventDefault();

    const { namaBarang, daerahAsal, daerahTujuan, totalBiaya } = this.state;

    if (!daerahAsal || !daerahTujuan) {
      alert('Kota asal dan tujuan harus dipilih!');
      return;
    }

    this.props.addNotes({ namaBarang, daerahAsal, daerahTujuan, totalBiaya });
    this.setState({ namaBarang: '', daerahAsal: '', daerahTujuan: '', totalBiaya: '' }); // Reset form
  };

  render() {
    const { namaBarang, daerahAsal, daerahTujuan, totalBiaya } = this.state;

    return (
      <div className='form-container'>
        <h1>Let's Create</h1>
        <form onSubmit={this.onSubmitEventHandler}>
          <section className='form-input'>
            <input
              type='text'
              placeholder='Nama Barang'
              value={namaBarang}
              onChange={this.onNamaBarangChangeEventHandler}
            />

            <select value={daerahAsal} onChange={this.ondaerahAsalChangeEventHandler}>
              <option value='' disabled>-- Pilih Kota Asal --</option>
              {this.kotaOptions.map((kota, idx) => (
                <option key={idx} value={kota}>{kota}</option>
              ))}
            </select>

            <select value={daerahTujuan} onChange={this.ondaerahTujuanChangeEventHandler}>
              <option value='' disabled>-- Pilih Kota Tujuan --</option>
              {this.kotaOptions.map((kota, idx) => (
                <option key={idx} value={kota}>{kota}</option>
              ))}
            </select>

            <input
              type='number'
              placeholder='Total Biaya'
              value={totalBiaya}
              onChange={this.onTotalBiayaChangeEventHandler}
            />
          </section>
          <button className='btn-form' type='submit'>Save</button>
        </form>
      </div>
    );
  }
}

FormContainer.propTypes = {
  addNotes: PropTypes.func.isRequired,
};

export default FormContainer;
