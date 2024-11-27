import { Routes, Route } from "react-router-dom";
import ApplicationLoader from "./components/shared/Loader";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Header = lazy(() => import("./components/shared/Header"));

const App = () => {

  return (
    <Suspense fallback={<ApplicationLoader />}>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Suspense>
  );
}

export default App;
