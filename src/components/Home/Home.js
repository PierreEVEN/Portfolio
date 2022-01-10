// src/App.js

import React from "react";
import About from "./About";
import Projects from "./Projects";

export default function App() {
    return (
        <main className="text-gray-400 bg-gray-900 body-font">
            <About/>
            <Projects/>
        </main>
    );
}