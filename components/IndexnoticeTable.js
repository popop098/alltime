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
        "/api/notice",
        fetcher
    );
    return (
        <>
            <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5">
                <div className="flex-row items-center space-x-4 card-body">
                    <div className="flex-1">
                        <h2 className="card-title inline-block ml-2">
                            π κ³΅μ§μ¬ν­
                        </h2>
                        <p className="text-base-content text-opacity-40">
                            μ€μκ³΅μ§μ¬ν­μ νμΈνμΈμ
                        </p>
                        <br/>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                <tr>
                                    <th>μ λͺ©</th>
                                    <th>μμ±μ</th>
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
                                            <td>κ΄λ¦¬μ</td>
                                        </tr>
                                        </tbody>
                                    )) : <p>λΆλ¬μ€λμ€μλλ€.</p>
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <Link href="/notice">
                    <button className="btn btn-xl m-5">κ³΅μ§μ¬ν­ λλ³΄κΈ°</button>
                </Link>
            </div>

        </>

    )
}

