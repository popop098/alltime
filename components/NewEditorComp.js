import {createRef, useEffect, useState,useRef} from "react";
import {router} from "next/client";
import ViewerComp from './ViewComp'
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import moment from 'moment'
import 'moment/locale/ko';
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export default function WriteContentPage(){
    const [TitleText, setTitleText] = useState('');
    const [DescText, setDescText] = useState('');

    const TitleOnChange = (e) => {
        setTitleText(e.target.value);
    };
    const editor = createRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    const handleEditorChange = (content) => {
        // console.log(content);
        setDescText(content)
    };
    const submitNotice = async () => {
        try {
            const Time = moment().format('YYYY/MMMM/Do/dddd, a h:mm:ss')
            const res = await fetch(`/api/notice`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({'title':TitleText,'description':String(DescText),'time':String(Time)})
            })
            router.push("/notice");
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }
    const submit =()=> {
        submitNotice()
    }
    return (
        <>
            <div className='m-2'>
                <div className="mb-2">
                    <input onChange={TitleOnChange} value={TitleText} className='input input-primary input-lg'/>
                </div>
                <div className="mb-2">
                    {/*<textarea onChange={DescOnChange} value={DescText} className='textarea h-26 w-full textarea-bordered' defaultValue={description}/>*/}
                    <SunEditor lang="ko" height="150px"
                               onChange={handleEditorChange}
                               setOptions={{
                                   buttonList: [
                                       [
                                           "bold",
                                           "underline",
                                           "italic",
                                           "strike",
                                           "list",
                                           "fontColor",
                                           "align",
                                           "fontSize",
                                           "formatBlock",
                                           "table",
                                           "image"
                                       ]
                                   ]
                               }}
                               />
                </div>
                <div className="my-4">
                    <ViewerComp value={DescText}/>
                </div>
                <div className="mb-2">
                    <button
                        className="btn"
                        onClick={submit}
                    >Post</button>
                </div>
            </div>

        </>

    )
}
