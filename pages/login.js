import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import "animate.css";
import "swiper/css";
import {
    FacebookLoginButton,
    GoogleLoginButton,
    TwitterLoginButton,
    InstagramLoginButton,
    DiscordLoginButton,
    GithubLoginButton,
} from "react-social-login-buttons";
import naverbtn from '../public/naversquire.png'
import kakaobtn from '../public/kakao_login_btn.png'
import Image from "next/image";

export default function Login() {
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
                        <form action="">
                            <div className="mt-4">
                                <div className="m-2">
                                    <FacebookLoginButton onClick={()=>alert('준비중입니다.')}/>
                                </div>
                                <div className="m-2"><GoogleLoginButton onClick={()=>alert('준비중입니다.')}/></div>

                                <div className="m-2"><TwitterLoginButton onClick={()=>alert('준비중입니다.')}/></div>

                                <div className="m-2"><InstagramLoginButton onClick={()=>alert('준비중입니다.')}/></div>

                                <div className="m-2"><DiscordLoginButton onClick={()=>alert('준비중입니다.')}/></div>

                                <div className="m-2"><GithubLoginButton onClick={()=>alert('준비중입니다.')}/></div>

                                <div className="flex gap-4 justify-center items-center">
                                    <Image src={naverbtn} width="50px" height="50px" className="btn" onClick={()=>alert('준비중입니다.')}/>
                                    <div className="mt-1">
                                        <Image src={kakaobtn} className="btn" onClick={()=>alert('준비중입니다.')}/>
                                    </div>
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
