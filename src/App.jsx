import EventForm from './Components/EventForm';
import EventList from './Components/EventList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Kampüs Teknoloji Kulübü Yönetim Paneli
        </h1>
        <EventForm />
        <EventList />
      </div>
    </div>
  );
}

export default App;