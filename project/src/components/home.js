import {Link} from "react-router-dom";
import React from "react";
function Home() {
    return (
        <nav>
    <ul>
        <li>
            <Link to="/login/">Login</Link>
        </li>
        <li>
            <Link to="/register/">Register</Link>
        </li>
    </ul>
</nav>)
}
export default Home;
