/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import { AdminProvider } from "./context/AdminContext";

export default function App() {
  return (
    <AdminProvider>
      <main className="relative min-h-screen text-white selection:bg-neon-blue selection:text-black">
        <Background />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <AdminDashboard />
        <Footer />
      </main>
    </AdminProvider>
  );
}
