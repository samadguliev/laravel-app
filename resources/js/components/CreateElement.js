import React, { useState, useEffect } from 'react';
import axios from 'axios';
import strings from '../utils/strings.json';

function CreateElement() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    const [success, setSuccess] = useState(null);
    const [responseMsg, setResponseMsg] = useState('');

    const submitHandler = () => {
        const formData = new FormData();

        if (!(name && email && text)) {
            return;
        }
        formData.append("name", name);
        formData.append("email", email);
        formData.append("text", text);

        axios({
            url: `${strings.base_url}/api/messages`,
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                if (response.data.success) {
                    setSuccess(true);
                } else {
                    setSuccess(false);
                }
                setResponseMsg(response.data.message);
            })
    };

    return (
        <div>
            {success &&
                <div className="alert alert-success" role="alert">
                    Success
                </div>
            }
            {success === false &&
                <div className="alert alert-danger" role="alert">
                    {responseMsg}
                </div>
            }
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={"input-group-text"}
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="email"
                        className={"input-group-text"}
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>


                <button onClick={submitHandler}>Submit</button>
            </form>
        </div>
    );
}

export default CreateElement;
