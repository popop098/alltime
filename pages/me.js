import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import Link from "next/link";
import Footer from "../components/footer";
import Image from "next/image";
import avatar from "../public/avatar.png";
import {signOut, useSession} from "next-auth/react";
import InfoBar from "../components/MeComp/infobar";
export default function Me({data}) {
    const {data: session} = useSession()
    // if(!session){
    //     return (
    //         <Redirect></Redirect>
    //     )
    // }else {
    //     return null
    // }
    return (
        <div
            className="p-2 lg:p-5 bg-base-300 min-h-screen animate__animated animate__fadeIn animate__faster">
            <HeadTag title="로그인"/>

            <Navbar/>

            <main>
                <div className="mt-6 grid grid-cols-4 grid-rows-2 gap-4">
                    <div className="card col-span-1 shadow-lg compact bg-base-100 mb-5">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    🏆 인기 익명게시판
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    인기있는 익명게시글을 확인해보세요
                                </p>
                                <br/>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>조회수</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>대학교 꼭 가야하나요?</td>
                                            <td>326회</td>
                                        </tr>
                                        <tr>
                                            <td>이건 좀 아닌것같음</td>
                                            <td>164회</td>
                                        </tr>
                                        <tr>
                                            <td>안쓰던 문제집 팝니다</td>
                                            <td>97회</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Link href="#">
                            <button className="btn btn-xl m-5" onClick={() => alert('준비중입니다.')}>인기 익명게시판 더보기</button>
                        </Link>
                    </div>
                    <InfoBar/>
                    <div className="card col-span-1 shadow-lg compact bg-base-100 mb-5">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    🏆 인기 익명게시판
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    인기있는 익명게시글을 확인해보세요
                                </p>
                                <br/>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>조회수</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>대학교 꼭 가야하나요?</td>
                                            <td>326회</td>
                                        </tr>
                                        <tr>
                                            <td>이건 좀 아닌것같음</td>
                                            <td>164회</td>
                                        </tr>
                                        <tr>
                                            <td>안쓰던 문제집 팝니다</td>
                                            <td>97회</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Link href="#">
                            <button className="btn btn-xl m-5" onClick={() => alert('준비중입니다.')}>인기 익명게시판 더보기</button>
                        </Link>
                    </div>
                    <div className="card col-span-4 shadow-lg compact bg-base-100 mb-5">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    🏆 인기 익명게시판
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    인기있는 익명게시글을 확인해보세요
                                </p>
                                <br/>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>조회수</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>대학교 꼭 가야하나요?</td>
                                            <td>326회</td>
                                        </tr>
                                        <tr>
                                            <td>이건 좀 아닌것같음</td>
                                            <td>164회</td>
                                        </tr>
                                        <tr>
                                            <td>안쓰던 문제집 팝니다</td>
                                            <td>97회</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Link href="#">
                            <button className="btn btn-xl m-5" onClick={() => alert('준비중입니다.')}>인기 익명게시판 더보기</button>
                        </Link>
                    </div>
                </div>

            </main>
            <Footer/>
        </div>
    )
}
