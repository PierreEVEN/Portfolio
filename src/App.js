// src/App.js

import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Contact from "./components/Contact";

export default function App() {
    return (
        <main className="text-gray-400 bg-gray-900 body-font">
            <Navbar/>
            <Main/>
            <Contact/>
        </main>
    );
}