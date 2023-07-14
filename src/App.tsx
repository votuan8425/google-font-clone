import { AppContextProvider } from "./contexts/AppContext";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import FontDescription from "./pages/FontDescription";
import SelectedFamilyComponent from "./components/SelectedFamilyComponent";


const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div className="flex min-h-[100vh] relative">
        <div className="lg:flex-[5] flex-[1]"><Home /></div>
        <div className="flex-1 "> <SelectedFamilyComponent /></div>
      </div>
  },
  {
    path: "/specimen/:fontFamily",
    element:
      <div className="flex min-h-[100vh] relative">
        <div className="lg:flex-[5] flex-[1]"><FontDescription /></div>
        <div className=" flex-[1]"> <SelectedFamilyComponent /></div>
      </div>,
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
