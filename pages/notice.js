// https://youtu.be/WSr0GcBF7Ag?t=1410
import { useSession } from "next-auth/react"
import Link from "next/link";
import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import {useRouter} from "next/router";
import useSWR from 'swr'
import fetcher from "../lib/fetch";
export default function Notice(){
    const { data, error } = useSWR(
        "/api/notice",
        fetcher
    );
    const { data: session } = useSession()
    const router = useRouter();
    const DeleteNotice = async ({NoticeId}) => {
        try {
            const res = await fetch(`/api/notice/${NoticeId}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            })
            router.push("/notice");
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }
    const action = () => {
                if (session){
                    if(session.user.role === 'Admin'){
                        return(
                            <>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>작성자</th>
                                            <th>🛠action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data ? data.data.map(notice=>{
                                            return(
                                                <tr key={notice.key}>
                                                    <a href={`/notice/${notice._id}`} className="text-sm text-blue-500 hover:underline"><td>{notice.title}</td></a>
                                                    <td>관리자</td>
                                                    <td><a href="#my-modal" className="text-blue-500">작업</a></td>
                                                    <div id="my-modal" className="modal">
                                                        <div className="modal-box">
                                                            <p>삭제 또는 수정 선택</p>
                                                            <div className="modal-action gap-1">
                                                                <a href="#"
                                                                   className="btn btn-error" onClick={()=>DeleteNotice({NoticeId:notice._id})}>삭제</a>
                                                                <a href={`/notice/${notice._id}/edit`} className="btn btn-info">수정</a>
                                                                <a href="#" className="btn">닫기</a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </tr>
                                            )
                                        }) : <p>로딩중입니다.</p>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </>

                        )
                    } else {
                        return (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>작성자</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data? data.data.map(notice=>{
                                            return(
                                                <tr key={notice.key}>
                                                    <a href={`/notice/${notice._id}`} className="text-sm text-blue-500 hover:underline"><td>{notice.title}</td></a>
                                                    <td>관리자</td>
                                                </tr>
                                            )
                                        }) : <p>로딩중입니다.</p>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                    }
                } else {
                    return (
                        <>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                    <tr>
                                        <th>제목</th>
                                        <th>작성자</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data?data.data.map(notice=>{
                                        return(
                                            <tr key={notice.key}>
                                                <a href={`/notice/${notice._id}`} className="text-sm text-blue-500 hover:underline"><td>{notice.title}</td></a>
                                                <td>관리자</td>
                                            </tr>
                                        )
                                    }):<p>로딩중입니다.</p>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                }
            }
    const newpost = () => {
        if(session){
            if(session.user.role === "Admin"){
                return (
                    <>
                        <div style={{textAlign:'right'}}>
                            <Link href="/notice/new"><button className='btn btn-accent'>새 글 작성</button></Link>
                        </div>
                    </>

                )
            }else {
                return (
                    <></>
                )
            }
        }
    }
    return(
        <>
            <div className="grid p-2 lg:p-5 grid-cols-d gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
                <HeadTag title="공지사항" />
                <Navbar/>
                <main className="h-screen">
                    <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5 ">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    🔔 공지사항
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    신규서비스 및 패치사항을 안내합니다
                                </p>
                                {newpost()}
                                <br />
                                {action()}
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    )}


// notice.getInitialProps = async () => {
//     const res = await fetch('http://localhost:3000/api/notice')
//     const {data} = await res.json();
//
//     return {notice:data}
// }

