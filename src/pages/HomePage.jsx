import React from 'react';
import {
  addNote,
  getActiveNotes,
  deleteNote
} from '../utils/index';
import NoteLists from '../components/notes-list';
import FormContainer from '../components/form-container';
import FormSideAContainer from '../components/side_server/form-side-a';
import FormSideBContainer from '../components/side_server/form-side-b';

function HomePage() {
  const [notes, setNotes] = React.useState([]);
  const [serverType, setServerType] = React.useState('main');
  const [keyword, setKeyword] = React.useState(''); // Tambahan jika filter aktif

  // Ambil tipe server dari localStorage saat komponen dimount
  React.useEffect(() => {
    const type = localStorage.getItem('serverType') || 'main';
    setServerType(type);
    getNotes();
  }, []);

  // Fungsi ambil semua data notes
  async function getNotes() {
    const activeResponse = await getActiveNotes();
    const activeNotes = activeResponse.data || [];
    setNotes(activeNotes);
  }

  const filteredNotes = notes.filter((note) =>
    note.title?.toLowerCase().includes(keyword.toLowerCase())
  );

  async function onAddNotesHandler({ namaBarang, daerahAsal, daerahTujuan, totalBiaya }) {
    const result = await addNote({ namaBarang, daerahAsal, daerahTujuan, totalBiaya });
    if (!result.error) {
      getNotes();
    }
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);
    getNotes();
  }

  // Fungsi untuk render form berdasarkan serverType
  const renderForm = () => {
    switch (serverType) {
      case 'main':
        return <FormContainer addNotes={onAddNotesHandler} />;
      case 'side-a':
        return <FormSideAContainer addNotes={onAddNotesHandler} />;
      case 'side-b':
        return <FormSideBContainer addNotes={onAddNotesHandler} />;
      default:
        return <p>Server type tidak dikenali.</p>;
    }
  };

  return (
    <div className='main'>
      <section>
        {renderForm()}
      </section>

      <section className='app-container'>
        <NoteLists
          notes={filteredNotes}
          onDelete={onDeleteHandler}
        />
      </section>
    </div>
  );
}

export default HomePage;
