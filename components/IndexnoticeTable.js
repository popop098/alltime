//import fetch from "isomorphic-unfetch";
import useAxios from "axios-hooks";
import Link from "next/link";
import fetcher from '../lib/fetch'
import axios from "axios";
import useSWR from 'swr'

// const fetcher = async () => {
//     const resp = await fetch('http://localhost:3000/api/notice')
//     return await resp.json()
// }
//const fetcher = (url) => fetch(url).then((res) => res.json());
export default function IndexnoticeTable(){
    // const res = await fetch('http://localhost:3000/api/notice')
    // const {data} = await res.json();
    // const { data} = useAxios(
    //     'http://localhost:3000/api/notice'
    // )
    const { data, error } = useSWR(
        "http://localhost:3000/api/notice",
        fetcher
    );
    return (
        <>
            <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5">
                <div className="flex-row items-center space-x-4 card-body">
                    <div className="flex-1">
                        <h2 className="card-title inline-block ml-2">
                            🔔 공지사항
                        </h2>
                        <p className="text-base-content text-opacity-40">
                            중요공지사항을 확인하세요
                        </p>
                        <br/>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>작성자</th>
                                </tr>
                                </thead>
                                {
                                    data ? data.data.slice(0, 2).map(notices => (
                                        <tbody key={notices.key}>
                                        <tr>
                                            <a href={`/notice/${notices._id}`}
                                               className="text-sm text-blue-500 hover:underline">
                                                <td>{notices.title}</td>
                                            </a>
                                            <td>관리자</td>
                                        </tr>
                                        </tbody>
                                    )) : <p>불러오는중입니다.</p>
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <Link href="/notice">
                    <button className="btn btn-xl m-5">공지사항 더보기</button>
                </Link>
            </div>

        </>

    )
}

