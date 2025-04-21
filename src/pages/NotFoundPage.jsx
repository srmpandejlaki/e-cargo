import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/">Kembali ke Beranda</Link>
    </div>
  );
}

export default NotFoundPage;
