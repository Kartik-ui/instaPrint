import { Toaster } from "@/components/ui/toaster";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import OwnerAccessPage from "./components/OwnerAccessPage";
import PrintPage from "./components/PrintPage";
import { PrintProvider } from "./context/PrintContext";

const App = () => {
  return (
    <PrintProvider>
      <Router>
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/access" element={<OwnerAccessPage />} />
            <Route path="/print" element={<PrintPage />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </PrintProvider>
  );
};

export default App;
