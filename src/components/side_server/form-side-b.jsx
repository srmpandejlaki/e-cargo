import React from 'react';

const FormSideBContainer = () => {
  const dataBarang = [
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
  ];

  return (
    <div className='form-container'>
      <h1>Data Pengiriman</h1>
      <div className="tabels">
        <table className='tabel'>
            <thead>
            <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Asal</th>
                <th>Tujuan</th>
                <th>Total Biaya</th>
                <th>Status</th>
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
                <td>{item.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormSideBContainer;
