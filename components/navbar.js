import React, { Component, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle,faBell } from "@fortawesome/free-regular-svg-icons";
import "animate.css";
import {useSession} from "next-auth/react";
import Countdown from 'react-countdown';
import Image from "next/image";
//import fav from '../public/fav.png'
import {useTheme} from 'next-themes'
import {faMoon,faSun} from "@fortawesome/free-regular-svg-icons";
export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session } = useSession()
  const {theme, setTheme} = useTheme()
  const renderer = ({ days,hours, minutes, seconds, completed }) => {
    return <span>{days}</span>;
  };
  // const ctrlIcon = () =>{
  //   if(session){
  //     return(
  //         <>
  //           <a href='/me' className="btn"><FontAwesomeIcon icon={faUserCircle} size='2x'/></a>
  //           <div className="mx-1 indicator">
  //             <div className="indicator-item badge badge-secondary badge-sm"></div>
  //             <a href='/notice' className="btn"><FontAwesomeIcon icon={faBell} size='2x'/></a>
  //           </div>
  //         </>
  //     )
  //   }else {
  //     return (
  //         <></>
  //     )
  //   }
  // }
  return (
    <header className="bg-base-200 text-base-content shadow-lg rounded-box mb-2">
      <div className="navbar">
        <div className="px-2 mx-2 navbar-start gap-2">
          <Link href="/"><Image src="https://opencdn.winsub.kr/img/c9ldMS29uI7SmIcR7JwhJENlE8uLv0.png" width="50px" height="50px"></Image></Link>
          <span className="text-lg font-bold">
            <Link href="/">
              <a>AllTime</a>
            </Link>
          </span>
        </div>
        <div className="hidden md:flex px-2 mx-2 navbar-center">
          <div className="flex items-stretch">
            <Link href="/">
              <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
            </Link>
            <Link href="#">
              <a className="btn btn-ghost btn-sm rounded-btn" onClick={()=>alert('??????????????????.')}>???????????????</a>
            </Link>
            <Link href="#">
              <a className="btn btn-ghost btn-sm rounded-btn" onClick={()=>alert('??????????????????.')}>????????????</a>
            </Link>
          </div>
        </div>
        <div className="navbar-end gap-2">
          <button className="btn btn-outline" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
            <p>{theme==='dark'?'?????????':'??????'}</p>??????
          </button>
          <p>2023 ?????? D-<Countdown date={Date.now() + 25660800000} intervalDelay={86400000} renderer={renderer} /></p>
          {
            session ? (
                <>
                  <Link href='/me'><button className="btn"><FontAwesomeIcon icon={faUserCircle} size='2x'/></button></Link>
                  <div className="mx-1 indicator">
                    <div className="indicator-item badge badge-secondary badge-sm"></div>
                    <Link href='/notice'><button  className="btn"><FontAwesomeIcon icon={faBell} size='2x'/></button></Link>
                  </div>
                </>
            ) : (
                <></>
            )
          }
          <div className="md:hidden flex">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => setMenuToggle(!menuToggle)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "md:hidden",
          { hidden: !menuToggle },
          "animate__animated animate__fadeIn"
        )}
      >
        <Link href="/">
          <a className="block py-2 px-4 text-sm hover:bg-base-200">Home</a>
        </Link>
        <Link href="#">
          <a className="block py-2 px-4 text-sm hover:bg-base-200" onClick={()=>alert('??????????????????.')}>???????????????</a>
        </Link>
        <Link href="#">
          <a className="block py-2 px-4 text-sm hover:bg-base-200 mb-2" onClick={()=>alert('??????????????????.')}>
            ????????????
          </a>
        </Link>
      </div>
    </header>
  );
}
