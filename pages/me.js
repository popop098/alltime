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
            <HeadTag title="๋ก๊ทธ์ธ"/>

            <Navbar/>

            <main>
                <div className="mt-6 grid grid-cols-4 grid-rows-2 gap-4">
                    <div className="card col-span-1 shadow-lg compact bg-base-100 mb-5">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    ๐ ์ธ๊ธฐ ์ต๋ช๊ฒ์ํ
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    ์ธ๊ธฐ์๋ ์ต๋ช๊ฒ์๊ธ์ ํ์ธํด๋ณด์ธ์
                                </p>
                                <br/>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>์ ๋ชฉ</th>
                                            <th>์กฐํ์</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>๋ํ๊ต ๊ผญ ๊ฐ์ผํ๋์?</td>
                                            <td>326ํ</td>
                                        </tr>
                                        <tr>
                                            <td>์ด๊ฑด ์ข ์๋๊ฒ๊ฐ์</td>
                                            <td>164ํ</td>
                                        </tr>
                                        <tr>
                                            <td>์์ฐ๋ ๋ฌธ์ ์ง ํ๋๋ค</td>
                                            <td>97ํ</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Link href="#">
                            <button className="btn btn-xl m-5" onClick={() => alert('์ค๋น์ค์๋๋ค.')}>์ธ๊ธฐ ์ต๋ช๊ฒ์ํ ๋๋ณด๊ธฐ</button>
                        </Link>
                    </div>
                    <InfoBar/>
                    <div className="card col-span-1 shadow-lg compact bg-base-100 mb-5">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    ๐ ์ธ๊ธฐ ์ต๋ช๊ฒ์ํ
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    ์ธ๊ธฐ์๋ ์ต๋ช๊ฒ์๊ธ์ ํ์ธํด๋ณด์ธ์
                                </p>
                                <br/>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>์ ๋ชฉ</th>
                                            <th>์กฐํ์</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>๋ํ๊ต ๊ผญ ๊ฐ์ผํ๋์?</td>
                                            <td>326ํ</td>
                                        </tr>
                                        <tr>
                                            <td>์ด๊ฑด ์ข ์๋๊ฒ๊ฐ์</td>
                                            <td>164ํ</td>
                                        </tr>
                                        <tr>
                                            <td>์์ฐ๋ ๋ฌธ์ ์ง ํ๋๋ค</td>
                                            <td>97ํ</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Link href="#">
                            <button className="btn btn-xl m-5" onClick={() => alert('์ค๋น์ค์๋๋ค.')}>์ธ๊ธฐ ์ต๋ช๊ฒ์ํ ๋๋ณด๊ธฐ</button>
                        </Link>
                    </div>
                    <div className="card col-span-4 shadow-lg compact bg-base-100 mb-5">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-1">
                                <h2 className="card-title inline-block ml-2">
                                    ๐ ์ธ๊ธฐ ์ต๋ช๊ฒ์ํ
                                </h2>
                                <p className="text-base-content text-opacity-40">
                                    ์ธ๊ธฐ์๋ ์ต๋ช๊ฒ์๊ธ์ ํ์ธํด๋ณด์ธ์
                                </p>
                                <br/>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                        <tr>
                                            <th>์ ๋ชฉ</th>
                                            <th>์กฐํ์</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>๋ํ๊ต ๊ผญ ๊ฐ์ผํ๋์?</td>
                                            <td>326ํ</td>
                                        </tr>
                                        <tr>
                                            <td>์ด๊ฑด ์ข ์๋๊ฒ๊ฐ์</td>
                                            <td>164ํ</td>
                                        </tr>
                                        <tr>
                                            <td>์์ฐ๋ ๋ฌธ์ ์ง ํ๋๋ค</td>
                                            <td>97ํ</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <Link href="#">
                            <button className="btn btn-xl m-5" onClick={() => alert('์ค๋น์ค์๋๋ค.')}>์ธ๊ธฐ ์ต๋ช๊ฒ์ํ ๋๋ณด๊ธฐ</button>
                        </Link>
                    </div>
                </div>

            </main>
            <Footer/>
        </div>
    )
}
