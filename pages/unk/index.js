// 익명게시판 메인 페이지
import Navbar from "../../components/navbar";
import HeadTag from "../../components/headtag";
import fetcher from "../../lib/fetch";
import useSWR from "swr";
import {useSession} from "next-auth/react";
import Link from "next/link";

export default function UnkIndex(){
    //const {data,error} = useSWR('/api/unk')
    const { data: session } = useSession()
    return(
        <>
            <div className="grid p-2 lg:p-5 grid-cols-d gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
                <HeadTag title="익명게시판" />
                <Navbar/>
                <main className="h-screen">
                    <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5 ">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    🎭 모두의 익명게시판
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    공개 익명게시판입니다.
                                </p>
                                {session?(
                                    <div style={{textAlign:'right'}}>
                                        <Link href="/unk/all/new"><button className='btn btn-accent'>새 공개 익명글 작성</button></Link>
                                    </div>
                                ):null}
                                <br />
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>작성자</th>
                                            <th>조회수</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {/*{*/}
                                        {/*    data ? data.all.map(unk=>{*/}
                                        {/*        return(*/}
                                        {/*            <tr>*/}
                                        {/*                <a href={`/unk/${unk._id}`} className="text-sm text-blue-500 hover:underline"><td>{unk.title}</td></a>*/}
                                        {/*                <td>{unk.name}</td>*/}
                                        {/*            </tr>*/}
                                        {/*        )*/}
                                        {/*    }) : <p>로딩중입니다.</p>*/}
                                        {/*}*/}
                                        <tr>
                                            <Link href='/' className="text-sm text-blue-500 hover:underline"><td>...</td></Link>
                                            <td>익명</td>
                                            <td>1</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5 ">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    🎭 모두의 익명게시판
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    공개 익명게시판입니다.
                                </p>
                                {session?(
                                    <div style={{textAlign:'right'}}>
                                        <Link href="/unk/all/new"><button className='btn btn-accent'>새 공개 익명글 작성</button></Link>
                                    </div>
                                ):null}
                                <br />
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>작성자</th>
                                            <th>조회수</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                {/*{*/}
                                {/*    data ? data.all.map(unk=>{*/}
                                {/*        return(*/}
                                {/*            <tr>*/}
                                {/*                <a href={`/unk/${unk._id}`} className="text-sm text-blue-500 hover:underline"><td>{unk.title}</td></a>*/}
                                {/*                <td>{unk.name}</td>*/}
                                {/*            </tr>*/}
                                {/*        )*/}
                                {/*    }) : <p>로딩중입니다.</p>*/}
                                {/*}*/}
                                        <tr>
                                            <Link href='/' className="text-sm text-blue-500 hover:underline"><td>...</td></Link>
                                            <td>익명</td>
                                            <td>1</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    )
}
