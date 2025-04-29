import { Header } from "./components/Header.tsx";
import { Info } from "@/components/Info.tsx";

function App() {
  return (
    <div className="w-full min-h-screen p-10">
      <Header />
      <div className="m-10 text-center">
        <Info />
      </div>
    </div>
  );
}

export default App;
