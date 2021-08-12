import React, { useState, useEffect } from 'react';
import axios from 'axios';
import strings from '../utils/strings.json';

import Card from "./Card";

function List() {
    const [list, setList] = useState([]);

    useEffect(() => {
        getList();
    }, []);


    const getList = () => {
        axios({
            url: `${strings.base_url}/api/messages`,
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                if (response.data) {
                    console.log('response.data', response.data);
                    const { data } = response.data.data;
                    setList(data);
                }
            })
    };

    return (
        list.map((item) => {
            return (
                <Card key={item.data} item={item} getList={getList} />
            )
        })
    );
}

export default List;
