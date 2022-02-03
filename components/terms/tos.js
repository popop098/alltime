import Link from "next/link";
export default function TosComp(){
    return(
        <div className="mt-4">
            <label className="cursor-pointer label">
                <span className="label-text">이용약관 동의</span>
                <input type="checkbox" className="checkbox" required/>
            </label>
            <Link href="/tos" ><a target="_blank" rel="noreferrer"><p className="text-blue-500 hover:underline">이용약관</p></a></Link>
        </div>
    )
}
