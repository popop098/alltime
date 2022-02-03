import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import "animate.css";
import {useState} from 'react'
import "swiper/css";
import {ToastContainer, toast, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signIn} from "next-auth/react";
import fetch from "isomorphic-unfetch";
import PasswordStrengthBar from 'react-password-strength-bar';
import TosComp from "../components/terms/tos";
import CountdownTimer from '@sakit-sa/countdown-timer';
export default function Home() {
    const [Id, SetId] = useState('')
    const [Pwd, SetPwd] = useState('')
    const [PwdRe, SetPwdRe] = useState('')
    const [Email, SetEmail] = useState('')
    const [SendEmail, SetSendEmail] = useState(false)
    const [IsVerify, SetIsVerify] = useState(false)
    const [VerifyCode, SetVerifyCode] = useState('')
    const [Code, SetCode] = useState('')
    const [IsCountDown,SetIsCountDown] = useState(false)
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
    const CodeChange = (content) => {
        // console.log(content);
        SetCode(content.target.value)
    };
    const SendVerify = async (e) => {
        const loadid = toast.loading("인증코드 발송중입니다...");
        const email = String(Email)
        if(email === ''){
            return toast.update(
                loadid,
                {type: "error", render: "이메일주소를 입력해주세요.", autoClose: 5000, isLoading: false, transition: Flip}
            )
        }
        const randcode = Math.random().toString(36).slice(2);
        SetVerifyCode(randcode)
        //const html = generate({randcode})
        await fetch('/api/sendverify',{
            method:"POST",
            body: JSON.stringify({'email':email,'code':randcode,'title':"AllTime 이메일 인증 안내 메일입니다."}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res.status)
            if (res.status === 200){
                SetSendEmail(true)
                SetIsCountDown(true)
                toast.update(
                    loadid,
                    {type: "success", render: "인증코드 발송 성공! 3분이내에 인증코드를 정확히 입력해주세요.", autoClose: 5000, isLoading: false, transition: Flip}
                )
            } else {
                SetVerifyCode('')
                toast.update(
                    loadid,
                    {
                        type: "error",
                        render: "입력한 이메일주소가 유효하지않거나 시스템오류입니다.",
                        autoClose: 5000,
                        isLoading: false,
                        transition: Flip
                    }
                )
            }
        }).catch(err => {
            console.log(err)
            if(err){
                toast.update(
                loadid,
                {
                    type: "error",
                    render: "입력한 이메일주소가 유효하지않거나 시스템오류입니다.",
                    autoClose: 5000,
                    isLoading: false,
                    transition: Flip
                }
            )
        }

        })}
    const CheckCode = (e) => {
        const loadid = toast.loading("인증코드 확인중입니다...");
        if (Code === VerifyCode) {
            SetIsVerify(true)
            SetIsCountDown(false)
            toast.update(
                loadid,
                {
                    type: "success",
                    render: "인증코드가 확인되었습니다.",
                    autoClose: 5000,
                    isLoading: false,
                    transition: Flip
                }
            )
        } else {
            toast.update(
                loadid,
                {
                    type: "error",
                    render: "입력한 인증코드가 일치하지않습니다.",
                    autoClose: 5000,
                    isLoading: false,
                    transition: Flip
                }
            )
        }
    }
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
    const Timeout = () => {
        SetIsCountDown(false)
        SetVerifyCode('')
        SetSendEmail(false)
        toast.error("인증코드 입력시간이 만료되었습니다." +
            "재인증해주세요.")
    }
    return (
        <div
            className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
            <HeadTag title="로그인"/>

            <Navbar/>

            <main>
                <div className="flex items-center justify-center card min-h-screen bg-base-200">
                    <div className="px-8 py-8 mt-4 text-left card bg-base-100 shadow-lg w-1/5">
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
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <div className="relative">
                                        <input type="email" placeholder="Email"
                                               className="w-full pr-16 input input-primary" onChange={EmailChange}
                                               required disabled={IsVerify}/>
                                        {
                                            IsVerify ? (
                                                <button
                                                    className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                                                    type='button' disabled>인증됨
                                                </button>
                                            ) : (
                                                <button
                                                    className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                                                    type='button' onClick={SendVerify} disabled={IsCountDown}>{IsCountDown?"대기중":"인증"}
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    SendEmail ? (
                                        <div className="mt-4">
                                            {
                                                IsCountDown ? (
                                                    <label className="label">
                                                <span className="label-text">인증코드 | <CountdownTimer
                                                    time={180}
                                                    format="mm:ss"
                                                    onComplete={() => Timeout()}
                                                /></span>
                                                    </label>
                                                ):(
                                                    <label className="label">
                                                <span className="label-text">인증코드</span>
                                                    </label>
                                                )
                                            }

                                            <div className="relative">
                                                <input type="text" placeholder="인증코드"
                                                       className="w-full pr-16 input input-primary"
                                                       onChange={CodeChange} required disabled={IsVerify}/>
                                                {
                                                    IsVerify ? (
                                                        <button
                                                            className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                                                            type='button' disabled>인증됨
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                                                            type='button' onClick={CheckCode}>인증
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ) : null
                                }
                                <div className="mt-4">
                                    <label className="block">비밀번호</label>
                                    <div className="relative">
                                        <input placeholder="password"
                                               className="w-full px-4 py-2 mt-2 input input-primary" type="password"
                                               name="pwd" required={true}
                                               onChange={PwdChange}/>
                                        <PasswordStrengthBar password={Pwd}
                                                             minLength={5}/>
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
                                <TosComp/>
                                <div className="flex items-baseline justify-end" style={{textAlign: 'right'}}>
                                    <button className="btn btn-md text-sm mt-2" type="button" onClick={register}>회원가입
                                    </button>
                                </div>
                                <div className="flex items-baseline justify-end">

                                </div>
                                <div style={{textAlign: 'center'}} className="mt-4">
                                    <a className="text-sm text-blue-500 hover:underline" onClick={() => {
                                        signIn()
                                    }}>로그인하기</a>
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
