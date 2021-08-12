import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Card(props) {

    const { item } = props;

    return (
        <div className="card" key={item.id}>
            <div className="card-header">
                <h4>{item.name}</h4>
                <div>
                    <Link to={`/message/${item.id}`} className="btn btn-primary">
                        Detail
                    </Link>
                </div>
            </div>
            <div className="card-body">
                <p>Email: {item.email}</p>
            </div>
        </div>
    );
}

export default Card;
