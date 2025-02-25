import Sidebar from "./components/Sidebar";

const App = ({ page }: { page: React.ReactNode }) => {
  return (<div className="flex">
      <Sidebar />
    <div className="w-full h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex flex-col items-center justify-center">
      {page}
    </div></div>
  );
};

export default App;
