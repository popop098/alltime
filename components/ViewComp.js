import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
// import rehypeHighlight from 'rehype-highlight'
export default function ViewerComp({value}){
    // const { convert } = require('html-to-text');
    // const convert_value = convert(value)
    // console.log(convert_value)
    return(
        <>
            {/*<ReactMarkdown*/}
            {/*    children={value}*/}
            {/*    remarkPlugins={[remarkGfm,{singleTilde: false}]}*/}
            {/*    components={{*/}
            {/*        code({node, inline, className, children, ...props}) {*/}
            {/*            const match = /language-(\w+)/.exec(className || '')*/}
            {/*            return !inline && match ? (*/}
            {/*                <SyntaxHighlighter*/}
            {/*                    children={String(children).replace(/\n$/, '')}*/}
            {/*                    style={dark}*/}
            {/*                    language={match[1]}*/}
            {/*                    PreTag="div"*/}
            {/*                    {...props}*/}
            {/*                />*/}
            {/*            ) : (*/}
            {/*                <code className={className} {...props}>*/}
            {/*                    {children}*/}
            {/*                </code>*/}
            {/*            )*/}
            {/*        }*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<ReactMarkdown>{value}</ReactMarkdown>*/}
            <div dangerouslySetInnerHTML={{__html:value}}>
            </div>
        </>
    )
};
