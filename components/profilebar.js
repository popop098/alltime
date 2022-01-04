import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import Image from "next/image";
import avatar from '../public/avatar.png'

export default function Profile() {
    const { data: session } = useSession()
    if (session) {
        if (session.user.image){
            return (
                <div className="card shadow-lg compact side bg-base-100 mb-5">
                    <div className="flex-row items-center space-x-4 card-body">
                        <div className="flex-0">
                            <img style={{borderRadius:50, height:55}} src={session.user.image} alt="profile_img"/>
                        </div>
                        <div className="flex-1">
                            <h2 className="card-title">안녕하세요.</h2>
                            <p className="text-base-content text-opacity-80">
                                {session.user.email}로 로그인되었습니다.
                            </p>
                        </div>
                        <div className="flex-0">
                            <button className="btn btn-sm btn-primary" onClick={() => signOut()}>로그아웃</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    {/* 로그인 안내 그리드 */}
                    <div className="card shadow-lg compact side bg-base-100 mb-5">
                        <div className="flex-row items-center space-x-4 card-body">
                            <div className="flex-0">
                                <Image style={{borderRadius:50}} height="55px" width="55px" src={avatar} alt="profile_img"/>
                            </div>
                            <div className="flex-1">
                                <h2 className="card-title">안녕하세요.</h2>
                                <p className="text-base-content text-opacity-80">
                                    {session.user.email}로 로그인되었습니다.
                                </p>
                            </div>
                            <div className="flex-0">
                                <button className="btn btn-sm btn-primary" onClick={() => signOut()}>로그아웃</button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

    }
    return (
        <>
            {/* 로그인 안내 그리드 */}
            <div className="card shadow-lg compact side bg-base-100 mb-5">
                <div className="flex-row items-center space-x-4 card-body">
                    <div className="flex-1">
                        <h2 className="card-title">로그인을 해주세요.</h2>
                        <p className="text-base-content text-opacity-80">
                            로그인 상태가 아닙니다
                        </p>
                    </div>
                    <div className="flex-0">
                        <button className="btn btn-sm btn-primary" onClick={() => signIn()}>로그인</button>
                    </div>
                </div>
            </div>
        </>

    )
}
