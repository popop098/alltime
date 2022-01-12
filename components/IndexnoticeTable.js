// https://youtu.be/WSr0GcBF7Ag?t=1410
import fetch from "isomorphic-unfetch";
import {Async} from "react-async"
import axios from "axios";
import {useState,useEffect} from "react";
// const getData = async ()=>{
//     const res = await axios.get('http://localhost:3000/api/notice')
//     return res.data
// }

const IndexnoticeTable = () => {
    const [Data,setData] = useState('')
    useEffect(()=>{
        async function getData(){
            const res = await axios.get('http://localhost:3000/api/notice')
            return res.data
        }
        getData()
    },[])
    console.log(setData)
    return(
        <>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                    </thead>
                    {setData.map(notices=>(
                        <>
                            <tbody key={notices.key}>
                            <tr>
                                <a href={`/notice/${notices._id}`} className="text-sm text-blue-500 hover:underline"><td>{notices.title}</td></a>
                                <td>관리자</td>
                            </tr>
                            </tbody>
                        </>

                    ))}
                </table>
            </div>
        </>

    )
}



// IndexnoticeTable.getInitialProps = async () => {
//     const res = await axios.get('http://localhost:3000/api/notice')
//     const {data} = await res.data;
//
//     return {notice:data}
// }
// IndexnoticeTable.getInitialProps = async () => {
//     const res = await fetch('http://localhost:3000/api/notice')
//     const {data} = await res.json();
//     console.log(res)
//     return {notices:data}
// }
// IndexnoticeTable.= async () => {
//     const res = await fetch('http://localhost:3000/api/notice')
//     const {data} = await res.json();
//     console.log({data})
//     return {notice:data}
// }
export default IndexnoticeTable;
