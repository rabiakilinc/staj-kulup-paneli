import { useState, useEffect } from 'react';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ eventName: '', date: '', location: '' });

  // Verileri çekme işlemini bir fonksiyona bağladık
  const verileriCek = () => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  };

  useEffect(() => {
    verileriCek(); // Sayfa ilk açıldığında verileri al
    
    // YENİ EKLENEN KISIM: Formdan 'veriGuncellendi' sinyali gelirse listeyi anında yenile
    window.addEventListener('veriGuncellendi', verileriCek);
    
    return () => {
      window.removeEventListener('veriGuncellendi', verileriCek);
    };
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Bu etkinliği silmek istediğinize emin misiniz?');
    if (isConfirmed) {
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
  };

  const handleEditClick = (event) => {
    setEditingId(event.id);
    setEditData({ eventName: event.eventName, date: event.date, location: event.location });
  };

  const handleSaveEdit = (id) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, ...editData } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Mevcut Etkinlikler</h2>
      
      {events.length === 0 ? (
        <p className="text-gray-500 italic">Henüz eklenmiş bir etkinlik yok.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="p-4 border rounded-md border-gray-200 flex justify-between items-center transition duration-150">
              {editingId === event.id ? (
                <div className="w-full flex gap-2 items-center">
                  <input type="text" value={editData.eventName} onChange={(e) => setEditData({...editData, eventName: e.target.value})} className="border border-gray-300 p-2 rounded w-1/3 text-sm focus:outline-none focus:border-blue-500" />
                  <input type="date" value={editData.date} onChange={(e) => setEditData({...editData, date: e.target.value})} className="border border-gray-300 p-2 rounded w-1/4 text-sm focus:outline-none focus:border-blue-500" />
                  <input type="text" value={editData.location} onChange={(e) => setEditData({...editData, location: e.target.value})} className="border border-gray-300 p-2 rounded w-1/4 text-sm focus:outline-none focus:border-blue-500" />
                  <button onClick={() => handleSaveEdit(event.id)} className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 font-medium">Kaydet</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-2 rounded text-sm hover:bg-gray-500 font-medium">İptal</button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold text-lg text-blue-700">{event.eventName}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Tarih:</span> {event.date} &nbsp;|&nbsp; <span className="font-medium">Konum:</span> {event.location}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEditClick(event)} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Düzenle</button>
                    <button onClick={() => handleDelete(event.id)} className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Sil</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}