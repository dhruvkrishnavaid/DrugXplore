const Sidebar = () => {
  return (
    <div className="w-80 max-h-screen bg-white flex flex-col">
      <div className="font-black text-2xl text-center p-4 w-full">
        <h1>DrugXplore</h1>
      </div>
      <div className="flex flex-col h-full gap-4 items-center">
        <div className="w-40 h-40 bg-gray-300 rounded-full">
          <img
            className="w-40 h-40 rounded-full"
            src="https://avatars.githubusercontent.com/u/4723117?v=4"
            alt="Profile"
          />
        </div>
        <ul className="gap-4 flex flex-col">
          <li>Dashboard</li>
          <li>Explore</li>
          <li>History</li>
        </ul>
        <div className="mt-auto p-4">Create</div>
      </div>
    </div>
  );
};

export default Sidebar;
