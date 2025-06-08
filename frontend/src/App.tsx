import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import TentangKamiPage from "./pages/Home/TentangKamiPage";
import LayananInternetPage from "./pages/Home/LayananInternetPage";
import LayananCctvPage from "./pages/Home/LayananCctvPage";
import LayananHotspotPage from "./pages/Home/LayananHotspotPage";
import BlogsPage from "./pages/Home/Blogs/BlogsPage";
import BlogDetail from "./pages/Home/Blogs/BlogDetail";
import KontakKamiPage from "./pages/Home/KontakKamiPage";
import NotFoundPage from "./pages/Home/NotFoundPage";

//Context
import { AuthProvider } from "./contexts/AuthContext";
import { PostProvider } from "./contexts/PostContext";
import { KontakProvider } from "./contexts/KontakContext";
import { AboutProvider } from "./contexts/AboutContext";
import { PublicProvider } from "./contexts/PublicContext";
import { LayananProvider } from "./contexts/LayananContext";
import { LocationHotspotProvider } from "./contexts/LocationHotspotContext";

//Admin Pages
import ProtectedRoute from "./pages/ProtectedRoutes";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";

import PostAdminPage from "./pages/Admin/post/page";
import CreatePostPage from "./pages/Admin/post/CreatePostPage";
import EditPostPage from "./pages/Admin/post/EditPostPage";

import EditLandingPage from "./pages/Admin/dashboard/page";
import EditTentangKamiPage from "./pages/Admin/tentangkami/page";
import EditLayananPage from "./pages/Admin/layanan/page";
import EditKontakPage from "./pages/Admin/kontak/page";
import SettingsPage from "./pages/Admin/settings/page";

import LocationHotspotPage from "./pages/Admin/location/page";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <KontakProvider>
            <AboutProvider>
              <PublicProvider>
                <LayananProvider>
                  <LocationHotspotProvider>
                    <Routes>
                      {/* Public Routes with Public Layout */}
                      <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route
                          path="/tentang-kami"
                          element={<TentangKamiPage />}
                        />
                        <Route
                          path="/layanan/internet"
                          element={<LayananInternetPage />}
                        />
                        <Route
                          path="/layanan/cctv"
                          element={<LayananCctvPage />}
                        />
                        <Route
                          path="/layanan/hotspot"
                          element={<LayananHotspotPage />}
                        />
                        <Route path="/blogs" element={<BlogsPage />} />
                        <Route path="/blogs/:id" element={<BlogDetail />} />
                        <Route
                          path="/kontak-kami"
                          element={<KontakKamiPage />}
                        />
                      </Route>

                      {/* Admin Routes with Admin Layout */}
                      <Route path="/admin">
                        {/* Login page tanpa layout admin */}
                        <Route path="login" element={<AdminLoginPage />} />

                        {/* Route admin dengan layout khusus */}
                        <Route
                          element={
                            <ProtectedRoute>
                              <AdminLayout />
                            </ProtectedRoute>
                          }
                        >
                          <Route
                            path="dashboard"
                            element={<EditLandingPage />}
                          />
                          <Route path="post" element={<PostAdminPage />} />
                          <Route
                            path="post/create"
                            element={<CreatePostPage />}
                          />
                          <Route
                            path="post/:id/edit"
                            element={<EditPostPage />}
                          />
                          <Route path="layanan" element={<EditLayananPage />} />
                          <Route
                            path="tentang-kami"
                            element={<EditTentangKamiPage />}
                          />
                          <Route path="kontak" element={<EditKontakPage />} />
                          <Route path="settings" element={<SettingsPage />} />
                          <Route
                            path="lokasi-hotspot"
                            element={<LocationHotspotPage />}
                          />
                          {/* Tambahkan route admin lainnya di sini */}
                        </Route>
                      </Route>

                      {/* 404 Page */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </LocationHotspotProvider>
                </LayananProvider>
              </PublicProvider>
            </AboutProvider>
          </KontakProvider>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
