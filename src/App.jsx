// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider ,useAuth } from "./utils/AuthContext";
import { PrivateRoutes } from "./utils/AuthProvider";
import "./App.css"
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  // Hide header only on explicit auth forms
  const hideHeader = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideHeader && (
        <header className="fixed top-0 left-0 w-full z-50">
          <Header />
        </header>
      )}

      <main className={`min-h-screen flex-1 overflow-y-auto ${!hideHeader ? "mt-16" : ""} px-4`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
               <Route path="/view" element={<ViewProfile />} />
                 <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/FAQ" element={<FAQ/>} />
                        <Route path="/contact" element={<Contact/>} />
          </Route>

          {/* Default redirect → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        
         
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;