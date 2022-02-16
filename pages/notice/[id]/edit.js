import fetch from "isomorphic-unfetch";
import HeadTag from "../../../components/headtag";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import dynamic from 'next/dynamic';

const Edit_Notice = ({notice}) => {
    const PostEditor = dynamic(
        () => import('../../../components/EditorComp'),
        { ssr: false }
    )
    // constructor(props)
    // {
    //     super(props);
    //     this.state={
    //         content:''
    //     }
    // }

    return (
        <>
            <div className="grid p-2 lg:p-5 grid-cols-d gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
                <HeadTag title="공지사항" />
                <Navbar/>
                <main>
                    <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5">
                        <div className="flex-row items-start space-x-4 card-body ">
                            <div className="flex-1">
                                <PostEditor title={notice.title} description={notice.description}/>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>

            </div>
        </>
    )
}

Edit_Notice.getInitialProps = async ({ query:{ id }}) => {
    const res = await fetch(`/api/notice/${id}`);
    const {data} = await res.json()

    return {notice:data}

}
export default Edit_Notice;
