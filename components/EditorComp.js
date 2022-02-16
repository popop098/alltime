import {createRef, useEffect, useState,useRef} from "react";
import {router} from "next/client";
import ViewerComp from './ViewComp'
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export default function WriteContentPage({title,description}){
    const [TitleText, setTitleText] = useState(`${title}`);
    const [DescText, setDescText] = useState(`${description}`);

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
    const updateNotice = async () => {
        try {
            const res = await fetch(`/api/notice/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({'title':TitleText,'description':String(DescText)})
            })
            router.push("/notice");
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }
    const submit =()=> {
        updateNotice()
    }
    return (
        <>
            <div className='m-2'>
                <div className="mb-2">
                    <input onChange={TitleOnChange} value={TitleText} className='input input-primary input-lg' defaultValue={title}/>
                </div>
                <div className="mb-2">
                    {/*<textarea onChange={DescOnChange} value={DescText} className='textarea h-26 w-full textarea-bordered' defaultValue={description}/>*/}
                    <SunEditor lang="ko" defaultValue={DescText} height="150px"
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
