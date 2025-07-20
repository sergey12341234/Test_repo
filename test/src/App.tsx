import { GetUserInfoForm } from './components/forms/GetUserInfoForm/GetUserInfoForm';

function App() {
  return (
    <main className="h-screen w-screen">
      <div className="flex h-full items-center justify-center bg-white p-4">
        <div className="max-w-fit h-full">
          <GetUserInfoForm />
        </div>
      </div>
    </main>
  );
}

export default App;
