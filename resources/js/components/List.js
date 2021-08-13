import React, { useState, useEffect } from 'react';
import axios from 'axios';
import strings from '../utils/strings.json';

import Card from "./Card";

function List() {
    const [list, setList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getList();
    }, [page]);


    const getList = () => {
        axios({
            url: `${strings.base_url}/api/messages`,
            method: 'get',
            params: {
                page
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                if (response.data) {
                    const { data } = response.data;
                    setTotalPage(data.last_page);
                    setList(data.data);
                }
            })
    };

    const setPagination = (selectedPage) => {
        setPage(selectedPage);
    };

    const isDetail = (selectedPage) => {
        if (selectedPage === page) {
            return 'page-item active';
        }
        return 'page-item';
    };

    return (
        <div>
            <div>
                {list.map((item) => {
                    return (
                        <Card key={item.data} item={item} getList={getList} />
                    )
                })}
            </div>
            <nav aria-label="...">
                <ul className="pagination">
                    {[...Array(totalPage)].map((x, i) =>
                        <li
                            className={isDetail(i+1)}
                            onClick={() => {
                                setPagination(i+1)
                            }}
                        >
                            <button className="page-link">
                                {i+1}
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default List;
