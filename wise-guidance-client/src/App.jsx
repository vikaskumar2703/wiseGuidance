import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./contexts/authContext";

import PrivateRoutes from "./routes/PrivateRoutes";

import AdminRoutes from "./routes/AdminRoutes";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BrowseMentorsPage from "./pages/BrowseMentorsPage";
import "./App.css";
import MentorApplicationPage from "./pages/MentorApplyPage";
import MentorDashboardPage from "./pages/MentorDashboardPage";
import MenteeDashboardPage from "./pages/MenteeDashboardPage";
import MentorProfilePage from "./pages/MentorProfilePage";
import CoursesPage from "./pages/CoursesPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import MentorRoutes from "./routes/MentorRoutes";
import MenteeConfigurePage from "./pages/MenteeConfigurePage";
import ResourcesPage from "./pages/ResourcesPage";
import BlogsPage from "./pages/Blogs";
import MentorCommunicationPage from "./pages/MentorCommunicationPage";
import MenteeCommunicationPage from "./pages/MenteeCommunicationPage";
import VideoChat from "./pages/VideoChat";
import MentorMentorshipPage from "./pages/MentorMentorshipPage";
import UpdateCoursesPage from "./pages/UpdateCoursesPage";
import MentorConfigurePage from "./pages/MentorConfigurePage";
import { SearchContextProvider } from "./contexts/searchContext";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/courses" element={<MentorRoutes />}>
                <Route path="" element={<CoursesPage />} />{" "}
                <Route path="create-course" element={<CreateCoursePage />} />
                <Route
                  path="update-course/:courseId"
                  element={<UpdateCoursesPage />}
                />
              </Route>

              <Route path="/dashboard" element={<PrivateRoutes />}>
                <Route path="mentor" element={<MentorDashboardPage />} />

                <Route path="mentee" element={<MenteeDashboardPage />} />
                <Route
                  path="mentee/mentorship"
                  element={<MenteeCommunicationPage />}
                />
                <Route
                  path="mentor/update-profile"
                  element={<MentorConfigurePage />}
                />
                <Route
                  path="mentor/mentorship"
                  element={<MentorMentorshipPage />}
                />
                <Route
                  path="mentor/mentorship/:menteeId"
                  element={<MentorCommunicationPage />}
                />
                <Route path="meeting/:callId" element={<VideoChat />} />

                <Route
                  path="mentee/update-profile"
                  element={<MenteeConfigurePage />}
                />
              </Route>
              <Route path="/dashboard" element={<AdminRoutes />}>
                <Route path="admin" element={<AdminPage />} />
              </Route>
              <Route path="/browse-mentors" element={<BrowseMentorsPage />} />
              <Route path="/search" element={<SearchPage />} />

              <Route
                path="/browse-mentors/:slug"
                element={<MentorProfilePage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/mentor-apply" element={<MentorApplicationPage />} />

              <Route errorElement={<ErrorPage />} />
            </Routes>
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition:Bounce
            />
          </div>
        </Router>
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default App;
