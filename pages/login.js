import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import "animate.css";
import "swiper/css";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/router";
export default function Login() {
    const router = useRouter()
    const [Id, SetId] = useState('')
    const [Pwd, SetPwd] = useState('')
    const IdChange = (content) => {
        SetId(content.target.value)
    };
    const PwdChange = (content) => {
        // console.log(content);
        SetPwd(content.target.value)
    };
    const login = async (e) => {
        // 원래 실행되는 이벤트 취소
        e.preventDefault();
        // Form 안에서 이메일, 패스워드 가져오기
        const id = Id
        const pwd = Pwd
        const response = await signIn("credentials", {
            id,
            pwd,
            redirect: false,
            callbackUrl:"http://localhost:3000/"
        });
        console.log(response);
        await router.push(response.url)
    }
    return (
        <div
            className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
            <HeadTag title="로그인"/>

            <Navbar/>

            <main>
                <div className="flex items-center justify-center card min-h-screen bg-base-200">
                    <div className="px-10 py-8 mt-4 text-left card bg-base-100 shadow-lg">
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
                        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                        <form>
                            <div className="mt-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">ID</span>
                                    </label>
                                    <input type="text" placeholder="ID" name="id" className="input input-bordered" required={true}
                                    onChange={IdChange}/>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="Password" name="pwd" className="input input-bordered" required={true}
                                    onChange={PwdChange}/>
                                </div>
                                <div className="my-4 form-control" style={{textAlign:'right'}}>
                                    <div>
                                        <button type="button" className="btn" onClick={login}>로그인</button>
                                    </div>
                                </div>
                                <div className="my-5">
                                    <div className="divider">or</div>
                                </div>
                                <div className="flex items-baseline justify-between gap-2">
                                    <a className="btn" href="/register">회원가입</a>
                                    <a className="btn" href="/findid">ID찾기</a>
                                    <a className="btn" href="/findpwd">비밀번호찾기</a>
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
