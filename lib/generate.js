// import {
//     renderToMjml,
//     Mjml,
//     MjmlHead,
//     MjmlTitle,
//     MjmlPreview,
//     MjmlBody,
//     MjmlSection,
//     MjmlColumn,
//     MjmlButton,
//     MjmlImage,
//     MjmlStyle,
//     MjmlText, MjmlDivider
// } from '@luma-team/mjml-react';
// import mjml2html from 'mjml';
// import logo from '../public/logo.png'
// export const generate=({code})=>{
//     const mjmlString = renderToMjml(<Mjml>
//         <MjmlBody>
//             <MjmlSection>
//                 <MjmlColumn>
//
//                     <MjmlImage src={logo}></MjmlImage>
//
//                     <MjmlDivider border-color="#F45E43"></MjmlDivider>
//                     <MjmlText font-size="20px" color="#F45E43" font-family="helvetica" align="left">AllTime가입을 위한 인증코드 안내 메일입니다.</MjmlText>
//                     <MjmlText font-size="15px" color="#F45E43" font-family="helvetica">인증코드: {code}</MjmlText>
//                     <MjmlText border-color="#F45E43"></MjmlText>
//                     <MjmlText font-size="10px" color="#919191" font-family="helvetica" align="center">만일 인증메일을 요청하지 않았다면 이 메일을 무시해주세요.</MjmlText>
//                     <MjmlText font-size="10px" color="#919191" font-family="helvetica" align="center">©AllTime</MjmlText>
//                 </MjmlColumn>
//             </MjmlSection>
//         </MjmlBody>
//     </Mjml>,{validationLevel: 'soft'})
//     return mjml2html(mjmlString)
// }
//
//
