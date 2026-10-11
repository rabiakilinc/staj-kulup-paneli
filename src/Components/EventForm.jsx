import { useState } from 'react';

export default function EventForm() {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = () => {
    if (!eventName || !date || !location) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }

    const newEvent = { id: Date.now(), eventName, date, location };
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];
    existingEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(existingEvents));

    // YENİ EKLENEN KISIM: Liste bileşenine "yeni veri eklendi, kendini yenile" sinyali gönderiyoruz
    window.dispatchEvent(new Event('veriGuncellendi'));

    alert('Etkinlik başarıyla kaydedildi!');
    setEventName('');
    setDate('');
    setLocation('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold text-blue-600 mb-4">Yeni Etkinlik Ekle</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Etkinlik Adı</label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Örn: Yapay Zeka 101 Semineri" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Örn: Konferans Salonu" />
          </div>
        </div>
        <button type="button" onClick={handleSave} className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
          Etkinliği Kaydet
        </button>
      </form>
    </div>
  )
}