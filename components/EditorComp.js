import {Editor} from "@toast-ui/react-editor";
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import {createRef, useEffect, useState} from "react";
import {router} from "next/client";

// TOAST UI Editor Plugins
import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
export default function WriteContentPage({title,description}){
    const editorRef = createRef();
    const titleRef = createRef()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };
    const EditorTextHandler = () => {
        console.log(editorRef.current.getInstance().getMarkdown());
    }
    useEffect(()=>{
        if (isSubmitting===true){
            updateNotice()
        }
    },[])
    const updateNotice = async () => {
        try {
            const desc = editorRef.current.getInstance().getMarkdown()
            const res = await fetch(`http://localhost:3000/api/notice/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({'title':text,'description':desc})
            })
            router.push("/");
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
                <input onChange={onChange} className='input input-primary input-lg' defaultValue={title}/>
                <Editor
                    previewStyle="vertical"
                    height="79vh"
                    initialEditType="markdown"
                    initialValue={description}
                    ref={editorRef}
                    plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
                />
                <button
                    className="btn"
                    onClick={submit}
                >Post</button>
            </div>

        </>

    )
}
