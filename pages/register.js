import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons/faNewspaper";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import Image from "next/image";
import "animate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import riro from "../public/riro.jpeg";
import ebsi from "../public/ebsi.png";
import daesung from "../public/daesung.jpg";
import megastudy from "../public/megastudy.gif";
import etoos from "../public/etoos.png";

const data = [
    [riro, "리로스쿨", "https://www.rirosoft.com/"],
    [ebsi, "EBSi", "https://www.ebsi.co.kr/"],
    [daesung, "대성마이맥", "http://www.mimacstudy.com/"],
    [megastudy, "메가스터디", "http://www.megastudy.net/"],
    [etoos, "이투스", "https://www.etoos.com/"],
];

export default function Home() {
    return (
        <div className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
            <HeadTag title="로그인" />

            <Navbar />

            <main>
                <div className="flex items-center justify-center card min-h-screen bg-base-200">
                    <div className="px-10 py-8 mt-4 text-left card bg-base-100 shadow-lg w-80">
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-center">Register</h3>
                        <form action="">
                            <div className="mt-4 form-control">
                                <div>
                                    <label className="block" htmlFor="text">ID</label>
                                    <div className="relative">
                                        <input placeholder="ID"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="text" name="id"/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block" htmlFor="email">Email</label>
                                    <div className="relative">
                                        <input placeholder="Email"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="email" name="email"/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block">비밀번호</label>
                                    <div className="relative">
                                        <input placeholder="password"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="password" name="pwd"/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block">비밀번호 재입력</label>
                                    <div className="relative">
                                        <input placeholder="password-re"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="password" name="pwd-re"/>
                                    </div>
                                </div>
                                <div className="flex items-baseline justify-end">
                                    <button className="btn btn-md text-sm mt-2" type="button">회원가입</button>
                                </div>
                                <div style={{textAlign:'center'}}>
                                    <a href="/login" className="text-sm text-blue-500 hover:underline">로그인하기</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
