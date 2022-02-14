import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import HeadTag from "../../components/headtag";
import "animate.css";
import {useState,useEffect} from 'react'
import "swiper/css";
import {ToastContainer, toast, Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signIn} from "next-auth/react";
import fetch from "isomorphic-unfetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {isMobile,isIE} from 'react-device-detect';
import {useRouter} from 'next/router'
export default function Home() {
    const router = useRouter()
    useEffect(()=>{
        if(isMobile){
            alert("회원가입은 웹사이트에서만 가능합니다.");
            return router.back()
        }
        if(isIE){
            alert("이용하시고계신 브라우저는 지원하지않습니다.");
            return router.back()
        }
    },[])
    const [Tos, SetTos] = useState(false);
    const [Poli, SetPoli] = useState(false)
    const SendVerify = async (e) => {
        const loadid = toast.loading("인증코드 발송중입니다...");
        const email = String(Email)
        if(email === ''){
            return toast.update(
                loadid,
                {type: "error", render: "이메일주소를 입력해주세요.", autoClose: 5000, isLoading: false, transition: Flip}
            )
        }
        const randcode = Math.random().toString(36).slice(2);
        SetVerifyCode(randcode)
        //const html = generate({randcode})
        await fetch('/api/sendverify',{
            method:"POST",
            body: JSON.stringify({'email':email,'code':randcode,'title':"AllTime 이메일 인증 안내 메일입니다."}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res.status)
            if (res.status === 200){
                SetSendEmail(true)
                SetIsCountDown(true)
                TriggerEditEmailAddress()
                toast.update(
                    loadid,
                    {type: "success", render: "인증코드 발송 성공! 3분이내에 인증코드를 정확히 입력해주세요.", autoClose: 5000, isLoading: false, transition: Flip}
                )
            } else {
                SetVerifyCode('')
                toast.update(
                    loadid,
                    {
                        type: "error",
                        render: "입력한 이메일주소가 유효하지않거나 시스템오류입니다.",
                        autoClose: 5000,
                        isLoading: false,
                        transition: Flip
                    }
                )
            }
        }).catch(err => {
            console.log(err)
            if(err){
                toast.update(
                    loadid,
                    {
                        type: "error",
                        render: "입력한 이메일주소가 유효하지않거나 시스템오류입니다.",
                        autoClose: 5000,
                        isLoading: false,
                        transition: Flip
                    }
                )
            }

        })}
    const CheckCode = (e) => {
        const loadid = toast.loading("인증코드 확인중입니다...");
        if (Code === VerifyCode) {
            SetIsVerify(true)
            SetIsCountDown(false)
            toast.update(
                loadid,
                {
                    type: "success",
                    render: "인증코드가 확인되었습니다.",
                    autoClose: 5000,
                    isLoading: false,
                    transition: Flip
                }
            )
        } else {
            toast.update(
                loadid,
                {
                    type: "error",
                    render: "입력한 인증코드가 일치하지않습니다.",
                    autoClose: 5000,
                    isLoading: false,
                    transition: Flip
                }
            )
        }
    }
    const register = async (e) => {
        // 원래 실행되는 이벤트 취소
        //e.preventDefault();
        const loadid = toast.loading("회원가입중입니다...");
        // Form 안에서 이메일, 패스워드 가져오기
        const id = String(Id);
        const password = String(Pwd);
        const passwordre = String(PwdRe);
        const email = String(Email);
        console.log(password)
        console.log(passwordre)
        if (password !== passwordre) {
            return toast.update(
                loadid,
                {type: "error", render: "비밀번호가 일치하지않습니다.", autoClose: 5000, isLoading: false, transition: Flip}
            )
        }
        await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: JSON.stringify(
                {
                    "id": id,
                    "pwd": password,
                    "email": email,
                    "role": process.env.DEFAULT_ROLE
                }
            ),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(async res => {
                if (res.status === 201) {
                    toast.update(
                        loadid,
                        {type: "success", render: "회원가입 성공!", autoClose: 5000, isLoading: false, transition: Flip}
                    )
                } else {
                    toast.update(
                        loadid,
                        {
                            type: "error",
                            render: "이미 존재하는 ID 혹은 이메일입니다.",
                            autoClose: 5000,
                            isLoading: false,
                            transition: Flip
                        }
                    )
                }

            })
            .catch(err => {
                if (err) {
                    toast.update(
                        loadid,
                        {type: "error", render: "회원가입 실패!", autoClose: 5000, isLoading: false, transition: Flip}
                    )
                }
            })
    }
    const Timeout = () => {
        SetIsCountDown(false)
        SetVerifyCode('')
        SetSendEmail(false)
        toast.error("인증코드 입력시간이 만료되었습니다." +
            "재인증해주세요.")
    }

    function EditAddress() {
        SetIsCountDown(false)
        SetVerifyCode('')
        SetSendEmail(false)
        SetCanEditAddress(false)
        toast.error("인증코드입력작업이 취소되었습니다." +
            "재인증해주세요.")
    }

    function GoToNextPage(){
        if(!Tos){
            toast.error("약관에 동의해주세요.")
            return
        }
        if(!Poli){
            toast.error("개인정보처리방침에 동의해주세요.")
            return
        }
        router.push("/register/info")
    }

    return (
        <div
            className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
            <HeadTag title="로그인"/>

            <Navbar/>

            <main>
                <div className="flex items-center justify-center card min-h-screen bg-base-200">
                    <div className="absolute inset-x-0 top-4">
                        <ul className="w-full steps">
                            <li className="step step-primary">이용약관 동의</li>
                            <li className="step">계정생성</li>
                            <li className="step">학적인증</li>
                            <li className="step">가입완료</li>
                        </ul>
                    </div>
                    <div className="px-8 py-8 mt-36 mb-8 text-left card bg-base-100 shadow-lg w-1/2">
                        <ToastContainer position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover/>
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                <path
                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-center">Register</h3>
                        <form>
                            <div className="mt-6 form-control">
                                <div className="card">
                                    <div className="card-title">
                                        이용약관
                                        <div className="ml-2 badge badge-secondary">필수</div>
                                    </div>
                                    <div className="card-body h-80" style={{overflowY:"scroll"}}>
                                        <article className="prose prose-lg prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-sm prose-headings:font-bold prose-a:text-blue-600">
                                            <h2 id="alltime-">AllTime에 오신걸 환영합니다.</h2>
                                            <p>AllTime 서비스 및 제품 (이하 “서비스”)를 이용해주셔서 감사드립니다. 이 이용약관은 다양한 AllTime 서비스의 이용과 관련하여 <a href="http://alltime.kr">AllTime</a> 서비스를 제공하는 <a href="http://alltime.kr">AllTime</a> (이하 “AllTime” 또는 “저희”) 와 이를 이용하는 AllTime 서비스 회원 (이하 “여러분” 또는 “유저”) 또는 비회원과 AllTime간의 관계를 설명하며, 아울러 여러분들의 AllTime 서비스 이용에 도움이 될 만한 다양한 정보들을 포함하고 있습니다.</p>
                                            <p>물론 이 약관이 지루하고 재미 없다는걸 저희도 알고 있어요. 이걸 쓰는 사람은 얼마나 재미 없겠어요? 하지만, 여러분들이 저희 서비스를 사용하기 전, 꼭 확인해주셔야 하는 부분들을 담고 있으니 잠시 6분간 수능 국어영역을 풀듯이 읽어주세요 🙂</p><br/>
                                            <h2 id="-alltime-">다양한 AllTime의 서비스들을 즐겨보세요!</h2>
                                            <p>저희는 AllTime을 비롯한 다양한 AllTime 도메인을 통한 정보 검색, 다른 유저분들과의 커뮤니케이션, AllTime 오리지널 컨텐츠 제공 등 여러분들의 개발 생활을 복돋아드릴 수 있는 다양한 서비스들을 제공해드리고 있습니다 (일부 예정이니 잠시만 기다려주세요!). 여러분들께서는 컴퓨터, 노트북과 같이 인터넷이 가능한 기기를 통해 저희 서비스를에 접근하실 수 있으며, 개별 서비스들의 구체적인 약관 또는 제약은 그 서비스의 공지사항 또는 약관을 통해서 확인하실 수 있어요. 자세한 내용을 알고 싶지는 않으시겠지만 만약에 알고 싶으시다면? 각 서비스상의 안내, 공지사항, 고객센터를 통해서 확인해주세요.</p><br/>
                                            <h2 id="-">이건 중요하니까 한번만 읽어주세요!</h2>
                                            <p>잠깐 법적으로 진지한 이야기 하나 할게요. 다른 웹사이트들이랑 별거 다를게 없으니까 건너뛰셔도 되지만, 그래도 한번만 읽어주세요. 쓴 사람의 성의를 봐서요. AllTime와 그 관련 회사들과 여러분들에 대한 이야기니까 잘 확인해주세요. AllTime에 위치한 웹사이트 (이하 “사이트”) 를 이용 또는 엑세스하는건 모두 “서비스” 에 해당해요. 저희 서비스를 이용 또는 엑세스함으로써 (가) 여러분이 거주 국가에서 인정하는 고등학교에 재학중임에 동의하며, (나) 법적 관할권에 효력을 받는 나이이거나 그 이상인 경우 약관을 읽고, 이해하였음과 약관의 구속력에 동의하고, (다) 각 국가가 법적으로 정하는 미성년자인 경우 법정 대리인이 이 약관을 검토하고 동의했다는것에 동의하게 됩니다. 한국에서 접속하는게 아니라면, 본인이 미성년자인지 아닌지 확인해봐야 해요. 참고로 대한민국은 만 18세 미만을 미성년자로 정의해요.</p><br/>
                                            <h2 id="-">여러분의 계정도 중요해요.</h2>
                                            <p>여러분은 로그인하는 계정, 자격 증명 등에 대해서 책임이 있어요. 로그인 자격 증명의 사용을 통해 발생한 모든 활동 또는 서비스 계정 (이하, “계정”) 에서의 기타 활동에 대한 책임이 있어요. 저희 서비스를 처음 이용해보거나 접속 권한이 없다면, 경우에 따라서 계정을 새로 생성하거나 비밀번호를 변경하라는 안내를 받을 수 있어요. 저희 서비스 또는 기능에 엑세스하거나 사용하려면 유효한 이메일 주소 또는 저희가 요구하는 기타 정보를 제공해주셔야 할 수도 있어요. 여러분은 저희 서비스를 가입할 때뿐만 아니라 항상 저희에게 제공해주신 정보는 모두 진실되고, 정확하고, 최신이면서 완벽한것임을 보증해요.</p>
                                            <p>저희는 자유재량으로 모든 또는 특정 사용자명을 거부하거나 사용자명을 차단하거나 사용자명의 사용을 금지할 수 있는 권리가 있으며, 여러분에 대한 일절 어떠한 법적 책임도 지지 않아요. 여러분은 저희 서비스의 다른 유저가 여러분과 같은 사용자명을 가질수도 있지만, 여러분 또는 다른 유저에게 보이거나 보이지 않을 수 있는 식별 번호로 구분된다는 점을 이해하고 동의해요.</p>
                                            <p>여러분은 이메일 주소가 항상 정확하고 최신으로 유지되도록 해야 해요. 특정 기능에 한해 계정 생성 없이 서비스를 사용할 수 있도록 허용하는 경우, (예시를 들자면, 단일 세션 사용 기능을 사용하도록 하는 경우), 서비스 사용과 관련하여 여러분이 선택한 모든 사용자명은 여러분의 세션 종료 후에 다른 유저가 사용할 수 있습니다.</p>
                                            <p>여러분은 로그인 자격 증명의 기밀을 유지할 책임이 있으며, 자격 증명을 사용하거나 여러분 계정의 무단 사용이 의심될 경우 전적으로 책임을 지는데 동의해요. 여러분은 로그인 자격 증명의 기밀이 손상되거나 여러분의 계정의 무단 사용이 의심될 경우에는 비밀번호를 바꿈과 동시에 저희에게 통보해주실거에 동의해요. 여러분은 자격증명을 무단으로 사용하여 발생하는 모든 손실 또는 피해에 대해서 저희에게 법적 책임이 없음에 동의해요.</p><br/>
                                            <h2 id="-">저희도 여러분이랑 소통하고 싶어요!</h2>
                                            <p>여러분은 저희로부터 이메일, 문자 등 서비스 관련 공지 및 메시지와 같은 소식을 전자적으로 받게 돼요. 직접적으로 전해지는 모든 마케팅 메시지의 경우에는 어떠한 경우에도 여러분의 동의를 먼저 받을게요. 저희가 홍보하는게 꼴보기 싫으신 분들께서는 마케팅 동의를 언제든지 철회하실 수 있어요. 물론 저희가 여러분께 먼저 동의를 받지만요. 여러분들은 언제든지 수신을 거부하실 수 있으며 여러분들이 원치 않는 메시지는 저희가 보내지 않도록 할게요.</p>
                                            <p>서비스를 사용하거나 저희에게 정보를 제공해주시면서 저희가 여러분의 서비스 사용과 관련된 보안, 개인정보 보호 및 관리 문제에 대해 위에 명시한 방식 및 이외의 방식으로도 소통할 수 있음에 동의함과 동시에, 저희가 전자상으로 제공하는 모든 계약, 공지, 공개 정보, 기타 의사소통은 모든 법적 요구사항을 충족하기 위해 서면으로 이루어진다는거에 동의해요.</p>
                                            <p>여러분들은 이 서비스를 사용하면서 저희뿐만 아니라 다른 유저들과도 소통할 수 있어요. 여러분은 저희 서비스를 사용할 경우에 불필요한 마케팅 메시지 또는 방송 (예시로 뭐 스팸이 있을 수 있겠죠?) 를 보내거나 발송하지 않음에 동의합니다. 저희는 스팸 발송자와 남용자의 서비스 차단을 위해 모든 조치를 취할거에요. 저희 서비스에서 스팸이 발송되었거나 발생되었다고 생각되면 즉시 <a href="mailto:support@alltime.kr">support@alltime.kr</a> 로 이메일을 보내주세요.</p><br/>
                                            <h2 id="-">여러분의 권리도 중요해요. 하지만 타인의 권리도 중요해요.</h2>
                                            <p>여러분이 무심코 게재한 게시물로 인해 타인의 저작권이 침해되거나 명예훼손 등 권리 침해가 발생할 수 있습니다. AllTime는 이에 대한 문제 해결을 위해 대한민국 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’ 및 ‘저작권법’ 등을 근거로 권리침해 주장자의 요청에 따른 게시물 게시중단, 원 게시자의 이의신청에 따른 해당 게시물 게시 재개 등을 내용으로 하는 게시중단요청서비스를 운영해요. 자세한 내용 또는 서비스 신청은 <a href="mailto:support@alltime.kr">support@alltime.kr</a> 로 문의해주세요.</p>
                                            <p>저희 서비스를 통해 타인의 콘텐츠를 이용한다고 하여 여러분이 해당 콘텐츠에 대한 지식재산권을 보유하게 되는 것은 아니에요. 여러분이 해당 콘텐츠를 자유롭게 이용하기 위해서는 그 이용이 저작권법 등 관련 법률에 따라 허용되는 범위 내에 있거나, 해당 콘텐츠의 지식재산권자로부터 별도의 이용 허락을 받아야 하므로 각별한 주의가 필요해요.</p>
                                            <p>여러분의 콘텐츠를 제외하고 서비스의 일부인 모든 자료와 관련된 모든 권리, 소유권 및 이권(디자인, 텍스트, 그래픽, 사진, 동영상, 정보, 애플리케이션, 소프트웨어, 음악, 사운드 및 기타 파일, 이의 선택 및 배열이 포함되나 이에 국한되지 않음), 총칭 &quot;서비스 자료&quot;는 귀하와 당사 중 당사 및/또는 제삼자 라이센서가 소유해요. 귀하는 서비스 자료를 다운로드하거나 모든 가상 통화 또는 가상 상품(아래에 정의됨)을 구매함에 따라 어떠한 소유권도 취할 수 없다는 점을 인정하고 동의해요. 여러분은 서비스를 사용함으로써 혹은 당사가 서비스에 게시한 서비스 자료 또는 이차저작물에 액세스함으로써 어떠한 소유권도 취득하지 않음을 인정해요. 본 약관에 명시되지 않은 모든 권리는 당사 및 라이센서가 소유하며, 금반언, 암시 또는 기타 방법에 따라 라이센스가 부여되지 않아요.</p>
                                            <p>AllTime는 여러분이 AllTime 서비스를 마음껏 이용할 수 있도록 여러분께 AllTime 서비스에 수반되는 관련 소프트웨어 사용에 관한 이용 권한을 부여하고 있어요. 이 경우 여러분의 자유로운 이용은 AllTime가 제시하는 이용 조건에 부합하는 범위 내에서만 허용되고, 이러한 권한은 양도가 불가능하며, 비독점적 조건 및 법적 고지가 적용된다는 점을 유의해 주세요.</p><br/>
                                            <h2 id="-">저희는 여러분의 의견을 들을 준비가 되어있어요.</h2>
                                            <p>저희는 여러분의 의견을 듣는 것에 대해 진심으로 감사히 생각하고 있어요. 여러분이 서비스의 개선에 대한 피드백, 댓글이나 제안(서면 또는 구술을 통해)(&quot;피드백&quot;) 등을 하는 경우, 여러분은 (가) 피드백을 공개할 권한이 있으며, (나) 피드백이 다른 사용자나 단체의 권리를 침해하지 않고, (다) 피드백은 어떠한 제3자의 기밀이나 독점적 정보를 포함하지 않는다는 점을 표시하고 보장해요.</p>
                                            <p>저희에게 피드백을 보냄으로써, 여러분은 또한 (i) 저희가 피드백을 존중함과 동시에 기밀 유지, 표현 또는 암시할 의무가 없음에 동의하고, (ii) 피드백과 비슷한 항목이 이미 저희의 고려사항에 있거나 개발중임을 인지하며, (iii) 저희에게 불변의, 비독점적, 로열티가 없으며, 종속적이며 전 세계적인 라이선스를 제공하여, 피드백을 이용, 변형, 파생, 출판, 배포, 2차 인가할 수 있는 권한을 제공하고, (iv) AllTime와 사용자에 대하여 피드백에 포함된 모든 도덕적 권한의 권리 주장 및 행사를 확고히 포기하고 포기하도록 노력하게 되고 노력해요. 이 피드백 부문은 귀하의 계정이나 서비스의 파기에도 영향을 일체 받지 않아요.</p>
                                            <p>이 부문의 모든 권한은 여러분에게 그 어떠한 종류의 추가 보상을 할 필요가 없이 제공돼요.</p><br/>
                                            <h2 id="-">언제던지 저희와 헤어지실 수 있어요.</h2>
                                            <p>저희에게는 참 안타까운 일입니다만, 회원은 언제든지 AllTime 서비스 이용계약 해지를 신청하여 회원에서 탈퇴할 수 있으며, 이 경우 저희는 관련 법령 등이 정하는 바에 따라 이를 지체 없이 처리할게요.</p>
                                            <p>AllTime 서비스 이용계약이 해지되면, 관련 법령 및 개인정보처리방침에 따라 저희가 해당 회원의 정보를 보유할 수 있는 경우를 제외하고, 해당 회원 계정에 부속된 게시물 일체를 포함한 회원의 모든 데이터는 소멸됨과 동시에 복구할 수 없게 돼요. 다만, 이 경우에도 다른 회원이 별도로 담아갔거나 공용 게시판에 등록한 댓글 등의 게시물은 삭제되지 않으므로 반드시 해지 신청 이전에 삭제하신 후 탈퇴해주세요.</p><br/>
                                            <h2 id="-">여러분이 알기 쉽게 이용약관 개정 전에는 알려드릴게요.</h2>
                                            <p>저희는 본 약관의 내용을 여러분이 쉽게 확인할 수 있도록 서비스 초기 화면에 게시하고 있어요. 여러분이 가입할때도 확인하실 수 있어요.</p>
                                            <p>저희는 수시로 본 약관, 계정 및 게시물 운영정책을 개정할 수 있습니다만, 관련 법령을 위배하지 않는 범위 내에서 개정할 것이며, 사전에 그 개정 이유와 적용 일자를 서비스 내에 알려드릴게요. 또한 여러분에게 불리할 수 있는 중대한 내용의 약관 변경의 경우에는 최소 30일 이전에 해당 서비스 내 공지하고 별도의 전자적 수단(전자메일, 서비스 내 알림 등)을 통해 개별적으로 여러분들에게 알려드릴게요.</p>
                                            <p>저희는 변경된 약관을 게시한 날로부터 효력이 발생되는 날까지 약관 변경에 대한 여러분의 의견을 기다려요. 위 기간이 지나도록 여러분의 의견이 저희에게 접수되지 않으면, 여러분이 변경된 약관에 따라 서비스를 이용하는 데에 동의하는 것으로 간주해요. 저희로서는 매우 안타까운 일이지만, 여러분이 변경된 약관에 동의하지 않는 경우 변경된 약관의 적용을 받는 해당 서비스의 제공이 더 이상 불가능하게 될 수 있어요.</p>
                                            <p>저희 서비스에는 기본적으로 본 약관이 적용됩니다만, 부득이 각 개별 서비스의 고유한 특성을 반영하기 위해 본 약관 외 별도의 약관, 운영정책이 추가로 적용될 때가 있어요. 따라서 별도의 약관, 운영정책에서 그 개별 서비스 제공에 관하여 본 약관, 계정 및 게시물 운영정책과 다르게 정한 경우에는 별도의 약관, 운영정책이 우선하여 적용해요. 이러한 내용은 각각의 개별 서비스 초기 화면에서 확인해 주세요.</p>
                                            <p>본 약관은 한국어를 정본으로 해요. 본 약관 또는 AllTime 서비스와 관련된 여러분과 AllTime와의 관계에는 대한민국의 법령이 적용돼요. 그리고 본 약관 또는 AllTime 서비스와 관련하여 여러분과 AllTime 사이에 분쟁이 발생할 경우, 그 분쟁의 처리는 대한민국 &#39;민사소송법&#39;에서 정한 절차를 따라요.</p><br/>
                                            <h3 id="alltime-alltime-support-alltime-kr-mailto-support-alltime-kr-">AllTime 서비스와 관련하여 궁금하신 사항이 있으시면 AllTime 이메일 <a href="mailto:support@alltime.kr">support@alltime.kr</a> 로 문의 주세요.</h3>
                                        </article>
                                    </div>
                                    <label className="label">
                                        <span className="label-text text-red-600 font-bold">이용약관에 동의합니다.</span>
                                        <input type="checkbox" className="checkbox checkbox-primary" onChange={()=>SetTos(!Tos)} required/>
                                    </label>
                                </div>
                                <div className="card mt-5">
                                    <div className="card-title">
                                        개인정보처리방침
                                        <div className="ml-2 badge badge-secondary">필수</div>
                                    </div>
                                    <div className="card-body h-80" style={{overflowY:"scroll"}}>
                                        <article className="prose prose-lg prose-headings:text-2xl prose-headings:font-bold prose-a:text-blue-600">
                                            <h2 id="alltime-">AllTime에 오신걸 환영합니다.</h2>
                                            <p>AllTime 서비스 및 제품 (이하 “서비스”)를 이용해주셔서 감사드립니다. 이 이용약관은 다양한 AllTime 서비스의 이용과 관련하여 <a href="http://alltime.kr">AllTime</a> 서비스를 제공하는 <a href="http://alltime.kr">AllTime</a> (이하 “AllTime” 또는 “저희”) 와 이를 이용하는 AllTime 서비스 회원 (이하 “여러분” 또는 “유저”) 또는 비회원과 AllTime간의 관계를 설명하며, 아울러 여러분들의 AllTime 서비스 이용에 도움이 될 만한 다양한 정보들을 포함하고 있습니다.</p>
                                            <p>물론 이 약관이 지루하고 재미 없다는걸 저희도 알고 있어요. 이걸 쓰는 사람은 얼마나 재미 없겠어요? 하지만, 여러분들이 저희 서비스를 사용하기 전, 꼭 확인해주셔야 하는 부분들을 담고 있으니 잠시 6분간 수능 국어영역을 풀듯이 읽어주세요 🙂</p><br/>
                                            <h2 id="-alltime-">다양한 AllTime의 서비스들을 즐겨보세요!</h2>
                                            <p>저희는 AllTime을 비롯한 다양한 AllTime 도메인을 통한 정보 검색, 다른 유저분들과의 커뮤니케이션, AllTime 오리지널 컨텐츠 제공 등 여러분들의 개발 생활을 복돋아드릴 수 있는 다양한 서비스들을 제공해드리고 있습니다 (일부 예정이니 잠시만 기다려주세요!). 여러분들께서는 컴퓨터, 노트북과 같이 인터넷이 가능한 기기를 통해 저희 서비스를에 접근하실 수 있으며, 개별 서비스들의 구체적인 약관 또는 제약은 그 서비스의 공지사항 또는 약관을 통해서 확인하실 수 있어요. 자세한 내용을 알고 싶지는 않으시겠지만 만약에 알고 싶으시다면? 각 서비스상의 안내, 공지사항, 고객센터를 통해서 확인해주세요.</p><br/>
                                            <h2 id="-">이건 중요하니까 한번만 읽어주세요!</h2>
                                            <p>잠깐 법적으로 진지한 이야기 하나 할게요. 다른 웹사이트들이랑 별거 다를게 없으니까 건너뛰셔도 되지만, 그래도 한번만 읽어주세요. 쓴 사람의 성의를 봐서요. AllTime와 그 관련 회사들과 여러분들에 대한 이야기니까 잘 확인해주세요. AllTime에 위치한 웹사이트 (이하 “사이트”) 를 이용 또는 엑세스하는건 모두 “서비스” 에 해당해요. 저희 서비스를 이용 또는 엑세스함으로써 (가) 여러분이 거주 국가에서 인정하는 고등학교에 재학중임에 동의하며, (나) 법적 관할권에 효력을 받는 나이이거나 그 이상인 경우 약관을 읽고, 이해하였음과 약관의 구속력에 동의하고, (다) 각 국가가 법적으로 정하는 미성년자인 경우 법정 대리인이 이 약관을 검토하고 동의했다는것에 동의하게 됩니다. 한국에서 접속하는게 아니라면, 본인이 미성년자인지 아닌지 확인해봐야 해요. 참고로 대한민국은 만 18세 미만을 미성년자로 정의해요.</p><br/>
                                            <h2 id="-">여러분의 계정도 중요해요.</h2>
                                            <p>여러분은 로그인하는 계정, 자격 증명 등에 대해서 책임이 있어요. 로그인 자격 증명의 사용을 통해 발생한 모든 활동 또는 서비스 계정 (이하, “계정”) 에서의 기타 활동에 대한 책임이 있어요. 저희 서비스를 처음 이용해보거나 접속 권한이 없다면, 경우에 따라서 계정을 새로 생성하거나 비밀번호를 변경하라는 안내를 받을 수 있어요. 저희 서비스 또는 기능에 엑세스하거나 사용하려면 유효한 이메일 주소 또는 저희가 요구하는 기타 정보를 제공해주셔야 할 수도 있어요. 여러분은 저희 서비스를 가입할 때뿐만 아니라 항상 저희에게 제공해주신 정보는 모두 진실되고, 정확하고, 최신이면서 완벽한것임을 보증해요.</p>
                                            <p>저희는 자유재량으로 모든 또는 특정 사용자명을 거부하거나 사용자명을 차단하거나 사용자명의 사용을 금지할 수 있는 권리가 있으며, 여러분에 대한 일절 어떠한 법적 책임도 지지 않아요. 여러분은 저희 서비스의 다른 유저가 여러분과 같은 사용자명을 가질수도 있지만, 여러분 또는 다른 유저에게 보이거나 보이지 않을 수 있는 식별 번호로 구분된다는 점을 이해하고 동의해요.</p>
                                            <p>여러분은 이메일 주소가 항상 정확하고 최신으로 유지되도록 해야 해요. 특정 기능에 한해 계정 생성 없이 서비스를 사용할 수 있도록 허용하는 경우, (예시를 들자면, 단일 세션 사용 기능을 사용하도록 하는 경우), 서비스 사용과 관련하여 여러분이 선택한 모든 사용자명은 여러분의 세션 종료 후에 다른 유저가 사용할 수 있습니다.</p>
                                            <p>여러분은 로그인 자격 증명의 기밀을 유지할 책임이 있으며, 자격 증명을 사용하거나 여러분 계정의 무단 사용이 의심될 경우 전적으로 책임을 지는데 동의해요. 여러분은 로그인 자격 증명의 기밀이 손상되거나 여러분의 계정의 무단 사용이 의심될 경우에는 비밀번호를 바꿈과 동시에 저희에게 통보해주실거에 동의해요. 여러분은 자격증명을 무단으로 사용하여 발생하는 모든 손실 또는 피해에 대해서 저희에게 법적 책임이 없음에 동의해요.</p><br/>
                                            <h2 id="-">저희도 여러분이랑 소통하고 싶어요!</h2>
                                            <p>여러분은 저희로부터 이메일, 문자 등 서비스 관련 공지 및 메시지와 같은 소식을 전자적으로 받게 돼요. 직접적으로 전해지는 모든 마케팅 메시지의 경우에는 어떠한 경우에도 여러분의 동의를 먼저 받을게요. 저희가 홍보하는게 꼴보기 싫으신 분들께서는 마케팅 동의를 언제든지 철회하실 수 있어요. 물론 저희가 여러분께 먼저 동의를 받지만요. 여러분들은 언제든지 수신을 거부하실 수 있으며 여러분들이 원치 않는 메시지는 저희가 보내지 않도록 할게요.</p>
                                            <p>서비스를 사용하거나 저희에게 정보를 제공해주시면서 저희가 여러분의 서비스 사용과 관련된 보안, 개인정보 보호 및 관리 문제에 대해 위에 명시한 방식 및 이외의 방식으로도 소통할 수 있음에 동의함과 동시에, 저희가 전자상으로 제공하는 모든 계약, 공지, 공개 정보, 기타 의사소통은 모든 법적 요구사항을 충족하기 위해 서면으로 이루어진다는거에 동의해요.</p>
                                            <p>여러분들은 이 서비스를 사용하면서 저희뿐만 아니라 다른 유저들과도 소통할 수 있어요. 여러분은 저희 서비스를 사용할 경우에 불필요한 마케팅 메시지 또는 방송 (예시로 뭐 스팸이 있을 수 있겠죠?) 를 보내거나 발송하지 않음에 동의합니다. 저희는 스팸 발송자와 남용자의 서비스 차단을 위해 모든 조치를 취할거에요. 저희 서비스에서 스팸이 발송되었거나 발생되었다고 생각되면 즉시 <a href="mailto:support@alltime.kr">support@alltime.kr</a> 로 이메일을 보내주세요.</p><br/>
                                            <h2 id="-">여러분의 권리도 중요해요. 하지만 타인의 권리도 중요해요.</h2>
                                            <p>여러분이 무심코 게재한 게시물로 인해 타인의 저작권이 침해되거나 명예훼손 등 권리 침해가 발생할 수 있습니다. AllTime는 이에 대한 문제 해결을 위해 대한민국 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’ 및 ‘저작권법’ 등을 근거로 권리침해 주장자의 요청에 따른 게시물 게시중단, 원 게시자의 이의신청에 따른 해당 게시물 게시 재개 등을 내용으로 하는 게시중단요청서비스를 운영해요. 자세한 내용 또는 서비스 신청은 <a href="mailto:support@alltime.kr">support@alltime.kr</a> 로 문의해주세요.</p>
                                            <p>저희 서비스를 통해 타인의 콘텐츠를 이용한다고 하여 여러분이 해당 콘텐츠에 대한 지식재산권을 보유하게 되는 것은 아니에요. 여러분이 해당 콘텐츠를 자유롭게 이용하기 위해서는 그 이용이 저작권법 등 관련 법률에 따라 허용되는 범위 내에 있거나, 해당 콘텐츠의 지식재산권자로부터 별도의 이용 허락을 받아야 하므로 각별한 주의가 필요해요.</p>
                                            <p>여러분의 콘텐츠를 제외하고 서비스의 일부인 모든 자료와 관련된 모든 권리, 소유권 및 이권(디자인, 텍스트, 그래픽, 사진, 동영상, 정보, 애플리케이션, 소프트웨어, 음악, 사운드 및 기타 파일, 이의 선택 및 배열이 포함되나 이에 국한되지 않음), 총칭 &quot;서비스 자료&quot;는 귀하와 당사 중 당사 및/또는 제삼자 라이센서가 소유해요. 귀하는 서비스 자료를 다운로드하거나 모든 가상 통화 또는 가상 상품(아래에 정의됨)을 구매함에 따라 어떠한 소유권도 취할 수 없다는 점을 인정하고 동의해요. 여러분은 서비스를 사용함으로써 혹은 당사가 서비스에 게시한 서비스 자료 또는 이차저작물에 액세스함으로써 어떠한 소유권도 취득하지 않음을 인정해요. 본 약관에 명시되지 않은 모든 권리는 당사 및 라이센서가 소유하며, 금반언, 암시 또는 기타 방법에 따라 라이센스가 부여되지 않아요.</p>
                                            <p>AllTime는 여러분이 AllTime 서비스를 마음껏 이용할 수 있도록 여러분께 AllTime 서비스에 수반되는 관련 소프트웨어 사용에 관한 이용 권한을 부여하고 있어요. 이 경우 여러분의 자유로운 이용은 AllTime가 제시하는 이용 조건에 부합하는 범위 내에서만 허용되고, 이러한 권한은 양도가 불가능하며, 비독점적 조건 및 법적 고지가 적용된다는 점을 유의해 주세요.</p><br/>
                                            <h2 id="-">저희는 여러분의 의견을 들을 준비가 되어있어요.</h2>
                                            <p>저희는 여러분의 의견을 듣는 것에 대해 진심으로 감사히 생각하고 있어요. 여러분이 서비스의 개선에 대한 피드백, 댓글이나 제안(서면 또는 구술을 통해)(&quot;피드백&quot;) 등을 하는 경우, 여러분은 (가) 피드백을 공개할 권한이 있으며, (나) 피드백이 다른 사용자나 단체의 권리를 침해하지 않고, (다) 피드백은 어떠한 제3자의 기밀이나 독점적 정보를 포함하지 않는다는 점을 표시하고 보장해요.</p>
                                            <p>저희에게 피드백을 보냄으로써, 여러분은 또한 (i) 저희가 피드백을 존중함과 동시에 기밀 유지, 표현 또는 암시할 의무가 없음에 동의하고, (ii) 피드백과 비슷한 항목이 이미 저희의 고려사항에 있거나 개발중임을 인지하며, (iii) 저희에게 불변의, 비독점적, 로열티가 없으며, 종속적이며 전 세계적인 라이선스를 제공하여, 피드백을 이용, 변형, 파생, 출판, 배포, 2차 인가할 수 있는 권한을 제공하고, (iv) AllTime와 사용자에 대하여 피드백에 포함된 모든 도덕적 권한의 권리 주장 및 행사를 확고히 포기하고 포기하도록 노력하게 되고 노력해요. 이 피드백 부문은 귀하의 계정이나 서비스의 파기에도 영향을 일체 받지 않아요.</p>
                                            <p>이 부문의 모든 권한은 여러분에게 그 어떠한 종류의 추가 보상을 할 필요가 없이 제공돼요.</p><br/>
                                            <h2 id="-">언제던지 저희와 헤어지실 수 있어요.</h2>
                                            <p>저희에게는 참 안타까운 일입니다만, 회원은 언제든지 AllTime 서비스 이용계약 해지를 신청하여 회원에서 탈퇴할 수 있으며, 이 경우 저희는 관련 법령 등이 정하는 바에 따라 이를 지체 없이 처리할게요.</p>
                                            <p>AllTime 서비스 이용계약이 해지되면, 관련 법령 및 개인정보처리방침에 따라 저희가 해당 회원의 정보를 보유할 수 있는 경우를 제외하고, 해당 회원 계정에 부속된 게시물 일체를 포함한 회원의 모든 데이터는 소멸됨과 동시에 복구할 수 없게 돼요. 다만, 이 경우에도 다른 회원이 별도로 담아갔거나 공용 게시판에 등록한 댓글 등의 게시물은 삭제되지 않으므로 반드시 해지 신청 이전에 삭제하신 후 탈퇴해주세요.</p><br/>
                                            <h2 id="-">여러분이 알기 쉽게 이용약관 개정 전에는 알려드릴게요.</h2>
                                            <p>저희는 본 약관의 내용을 여러분이 쉽게 확인할 수 있도록 서비스 초기 화면에 게시하고 있어요. 여러분이 가입할때도 확인하실 수 있어요.</p>
                                            <p>저희는 수시로 본 약관, 계정 및 게시물 운영정책을 개정할 수 있습니다만, 관련 법령을 위배하지 않는 범위 내에서 개정할 것이며, 사전에 그 개정 이유와 적용 일자를 서비스 내에 알려드릴게요. 또한 여러분에게 불리할 수 있는 중대한 내용의 약관 변경의 경우에는 최소 30일 이전에 해당 서비스 내 공지하고 별도의 전자적 수단(전자메일, 서비스 내 알림 등)을 통해 개별적으로 여러분들에게 알려드릴게요.</p>
                                            <p>저희는 변경된 약관을 게시한 날로부터 효력이 발생되는 날까지 약관 변경에 대한 여러분의 의견을 기다려요. 위 기간이 지나도록 여러분의 의견이 저희에게 접수되지 않으면, 여러분이 변경된 약관에 따라 서비스를 이용하는 데에 동의하는 것으로 간주해요. 저희로서는 매우 안타까운 일이지만, 여러분이 변경된 약관에 동의하지 않는 경우 변경된 약관의 적용을 받는 해당 서비스의 제공이 더 이상 불가능하게 될 수 있어요.</p>
                                            <p>저희 서비스에는 기본적으로 본 약관이 적용됩니다만, 부득이 각 개별 서비스의 고유한 특성을 반영하기 위해 본 약관 외 별도의 약관, 운영정책이 추가로 적용될 때가 있어요. 따라서 별도의 약관, 운영정책에서 그 개별 서비스 제공에 관하여 본 약관, 계정 및 게시물 운영정책과 다르게 정한 경우에는 별도의 약관, 운영정책이 우선하여 적용해요. 이러한 내용은 각각의 개별 서비스 초기 화면에서 확인해 주세요.</p>
                                            <p>본 약관은 한국어를 정본으로 해요. 본 약관 또는 AllTime 서비스와 관련된 여러분과 AllTime와의 관계에는 대한민국의 법령이 적용돼요. 그리고 본 약관 또는 AllTime 서비스와 관련하여 여러분과 AllTime 사이에 분쟁이 발생할 경우, 그 분쟁의 처리는 대한민국 &#39;민사소송법&#39;에서 정한 절차를 따라요.</p><br/>
                                            <h3 id="alltime-alltime-support-alltime-kr-mailto-support-alltime-kr-">AllTime 서비스와 관련하여 궁금하신 사항이 있으시면 AllTime 이메일 <a href="mailto:support@alltime.kr">support@alltime.kr</a> 로 문의 주세요.</h3>
                                        </article>
                                    </div>
                                    <label className="label">
                                        <span className="label-text text-red-600 font-bold">이용약관에 동의합니다.</span>
                                        <input type="checkbox" className="checkbox checkbox-primary" onChange={()=>SetPoli(!Poli)} required/>
                                    </label>
                                </div>
                                <div className="flex items-baseline justify-end" style={{textAlign: 'right'}}>
                                    <button className="btn btn-md text-sm mt-2" type="button" onClick={GoToNextPage}>다음으로<FontAwesomeIcon icon={faArrowRight} className="ml-1"/>
                                    </button>
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
