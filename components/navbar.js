import React, { Component, useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import "animate.css";
export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <header className="bg-base-200 text-base-content shadow-lg rounded-box mb-2">
      <div className="navbar">
        <div className="px-2 mx-2 navbar-start">
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
              <a className="btn btn-ghost btn-sm rounded-btn" onClick={()=>alert('준비중입니다.')}>익명게시판</a>
            </Link>
            <Link href="#">
              <a className="btn btn-ghost btn-sm rounded-btn" onClick={()=>alert('준비중입니다.')}>입시정보</a>
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          {/* <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                </button>  */}
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
          <a className="block py-2 px-4 text-sm hover:bg-base-200" onClick={()=>alert('준비중입니다.')}>익명게시판</a>
        </Link>
        <Link href="#">
          <a className="block py-2 px-4 text-sm hover:bg-base-200 mb-2" onClick={()=>alert('준비중입니다.')}>
            입시정보
          </a>
        </Link>
      </div>
    </header>
  );
}
