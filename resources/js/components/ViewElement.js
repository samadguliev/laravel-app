import React, { useState, useEffect } from 'react';
import axios from 'axios';
import strings from '../utils/strings.json';

import {
    useParams,
} from "react-router-dom"

function ViewElement() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    const [success, setSuccess] = useState(null);
    const [responseMsg, setResponseMsg] = useState('');

    useEffect(() => {
        getItem();
    }, []);

    let { id } = useParams()


    const getItem = () => {
        axios({
            url: `${strings.base_url}/api/messages/${id}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                console.log('response.data', response.data);
                if (response.data && response.data.data) {
                    const { data } = response.data;
                    setName(data.name);
                    setEmail(data.email);
                    setText(data.text);
                    setCreatedAt(data.created_at);
                } else {
                    setSuccess(false);
                    setResponseMsg(response.data.message);
                }
            })
    };

    return (
        <div>
            {success === false &&
                <div className="alert alert-danger" role="alert">
                    {responseMsg}
                </div>
            }
            <p>Name: {name}</p>
            <p>E-mail: {email}</p>
            <p>Created at: {createdAt}</p>
            <p>Text: {text}</p>
        </div>
    );
}

export default ViewElement;
