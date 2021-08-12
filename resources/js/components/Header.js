import React from 'react';
import {
    Link
} from "react-router-dom";

function Header() {

    return (
        <div>
            <Link to="/" className="btn btn-primary header-btn">List</Link>
            <Link to="/new-element" className="btn btn-primary header-btn">New element</Link>
        </div>
    );
}

export default Header;
