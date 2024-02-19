import { Routes, Route } from "react-router-dom";

import Game from "./components/Game/Game";
import Extreme from "./components/Extreme/Extreme";
import Landing from "./components/Landing/Landing";

import 'doodle.css/doodle.css'
import "./App.css";
import { useEffect } from "react";

const App = () => {
    useEffect(() => {
        document.body.classList.add('doodle');
    }, []);

	return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/basic" element={<Game />} />
            <Route path="/extreme" element={<Extreme />} />
        </Routes>
    )
};

export default App;
