import fetch from "isomorphic-unfetch";
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import HeadTag from "../../components/headtag";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ViewerComp from "../../components/ViewComp"
const View_Notice = ({notice}) => {
    return (
        <>
            <div className="grid p-2 lg:p-5 grid-cols-d gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
                <HeadTag title="공지사항" />
                <Navbar/>
                <main>
                    <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5 h-screen ">
                        <div className="flex-row items-start space-x-4 card-body ">
                            <div className="flex-1">
                                <h1 className="card-title inline-block ml-2 text-6xl">
                                    {notice.title}
                                    <br/>
                                    <p className="text-lg">게시일자 | {notice.time}</p>
                                </h1>
                                <div className="divider"></div>
                                <ViewerComp value={notice.description}/>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>

            </div>
        </>
    )
}

View_Notice.getInitialProps = async ({ query:{ id }}) => {
    const res = await fetch(`http://localhost:3000/api/notice/${id}`);
    const {data} = await res.json()

    return {notice:data}

}
export default View_Notice;
