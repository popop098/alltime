import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-regular-svg-icons/faBell";
import {faNewspaper} from "@fortawesome/free-regular-svg-icons/faNewspaper";
import {faTrophy} from "@fortawesome/free-solid-svg-icons/faTrophy";
import Image from "next/image";
import "animate.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {useRef, useState} from 'react'
import "swiper/css";
import {ToastContainer, toast, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import riro from "../public/riro.jpeg";
import ebsi from "../public/ebsi.png";
import daesung from "../public/daesung.jpg";
import megastudy from "../public/megastudy.gif";
import etoos from "../public/etoos.png";
import axios from "axios";
import {signIn} from "next-auth/react";
import fetch from "isomorphic-unfetch";
import {useRouter} from "next/router";
import PasswordStrengthBar from 'react-password-strength-bar';
const data = [
    [riro, "리로스쿨", "https://www.rirosoft.com/"],
    [ebsi, "EBSi", "https://www.ebsi.co.kr/"],
    [daesung, "대성마이맥", "http://www.mimacstudy.com/"],
    [megastudy, "메가스터디", "http://www.megastudy.net/"],
    [etoos, "이투스", "https://www.etoos.com/"],
];

export default function Home() {
    // const notify = () => toast.success('회원가입이 완료되었어요!', {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    // });
    // const toastId = useRef(null);
    // const PromisToast = () => {
    //     const loadid = toast.loading("회원가입중입니다...");
    //     axios.get("http://localhost:3000/api/notice")
    //         .then(res => {
    //             toast.update(
    //                 loadid,
    //                 {type: "success", render: "회원가입 성공!", autoClose: 5000, isLoading: false, transition: Flip}
    //             )
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             if (err) {
    //                 toast.update(
    //                     loadid,
    //                     {type: "error", render: "회원가입 실패!", autoClose: 5000, isLoading: false, transition: Flip}
    //                 )
    //             }
    //         })
    // }
    const [Id, SetId] = useState('')
    const [Pwd, SetPwd] = useState('')
    const [PwdRe, SetPwdRe] = useState('')
    const [Email, SetEmail] = useState('')
    const IdChange = (content) => {
        // console.log(content);
        SetId(content.target.value)
    };
    const PwdChange = (content) => {
        // console.log(content);
        SetPwd(content.target.value)
    };
    const PwdReChange = (content) => {
        // console.log(content);
        SetPwdRe(content.target.value)
    };
    const EmailChange = (content) => {
        // console.log(content);
        SetEmail(content.target.value)
    };
    const router = useRouter();
    const register = async (e) => {
        // 원래 실행되는 이벤트 취소
        //e.preventDefault();
        const loadid = toast.loading("회원가입중입니다...");
        // Form 안에서 이메일, 패스워드 가져오기
        const id = String(Id);
        const password = String(Pwd);
        const passwordre = String(PwdRe);
        const email = String(Email);
        console.log(password)
        console.log(passwordre)
        if (password !== passwordre) {
            return toast.update(
                loadid,
                {type: "error", render: "비밀번호가 일치하지않습니다.", autoClose: 5000, isLoading: false, transition: Flip}
            )
        }
        await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: JSON.stringify(
                {
                    "id": id,
                    "pwd": password,
                    "email": email,
                    "role": process.env.DEFAULT_ROLE
                }
            ),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(async res => {
                const {data} = await res.json()
                //await router.push("/notice");
                console.log(data)
                if (res.status === 201) {
                    toast.update(
                        loadid,
                        {type: "success", render: "회원가입 성공!", autoClose: 5000, isLoading: false, transition: Flip}
                    )
                } else {
                    toast.update(
                        loadid,
                        {
                            type: "error",
                            render: "이미 존재하는 ID 혹은 이메일입니다.",
                            autoClose: 5000,
                            isLoading: false,
                            transition: Flip
                        }
                    )
                }

                console.log(res);
            })
            .catch(err => {
                if (err) {
                    toast.update(
                        loadid,
                        {type: "error", render: "회원가입 실패!", autoClose: 5000, isLoading: false, transition: Flip}
                    )
                }
            })
    }
    return (
        <div
            className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
            <HeadTag title="로그인"/>

            <Navbar/>

            <main>
                <div className="flex items-center justify-center card min-h-screen bg-base-200">
                    <div className="px-10 py-8 mt-4 text-left card bg-base-100 shadow-lg w-80">
                        <ToastContainer position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover/>
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
                        <form>
                            <div className="mt-4 form-control">
                                <div>
                                    <label className="block" htmlFor="text">ID</label>
                                    <div className="relative">
                                        <input placeholder="ID"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="text"
                                               name="id" required={true}
                                               onChange={IdChange}/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block" htmlFor="email">Email</label>
                                    <div className="relative">
                                        <input placeholder="Email"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="email"
                                               name="email" required={true}
                                               onChange={EmailChange}/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block">비밀번호</label>
                                    <div className="relative">
                                        <input placeholder="password"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="password"
                                               name="pwd" required={true}
                                               onChange={PwdChange}/>
                                        <PasswordStrengthBar password={Pwd}
                                                             minLength={5}
                                                             onChangeScore={(score, feedback) => {
                                                                 console.log(score, feedback);
                                                             }}/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block">비밀번호 재입력</label>
                                    <div className="relative">
                                        <input placeholder="password-re"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="password"
                                               name="pwdre" required={true}
                                               onChange={PwdReChange}/>
                                    </div>
                                </div>
                                <div className="flex items-baseline justify-end" style={{textAlign: 'right'}}>
                                    <button className="btn btn-md text-sm mt-2" type="button" onClick={register}>회원가입
                                    </button>
                                </div>
                                <div className="flex items-baseline justify-end">

                                </div>
                                <div style={{textAlign: 'center'}} className="mt-4">
                                    <a className="text-sm text-blue-500 hover:underline" onClick={()=>{signIn()}}>로그인하기</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
