import "./App.css";

import { CreateTaskInput } from "./components/CreateTaskInput";
import { AllTaskList } from "./ui/AllTaskList";

function App() {
  return (
    <div className="min-h-dvh">
      <CreateTaskInput />
      <AllTaskList />
    </div>
  );
}

export default App;
