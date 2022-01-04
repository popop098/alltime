import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeadTag from "../components/headtag";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons/faNewspaper";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import Image from "next/image";
import "animate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import riro from "../public/riro.jpeg";
import ebsi from "../public/ebsi.png";
import daesung from "../public/daesung.jpg";
import megastudy from "../public/megastudy.gif";
import etoos from "../public/etoos.png";
import Profile from "../components/profilebar";

const data = [
  [riro, "리로스쿨", "https://www.rirosoft.com/"],
  [ebsi, "EBSi", "https://www.ebsi.co.kr/"],
  [daesung, "대성마이맥", "http://www.mimacstudy.com/"],
  [megastudy, "메가스터디", "http://www.megastudy.net/"],
  [etoos, "이투스", "https://www.etoos.com/"],
];

export default function Home() {
  return (
    <div className="grid p-2 lg:p-5 grid-cols-1 gap-y-6 bg-base-300 animate__animated animate__fadeIn animate__faster">
      <HeadTag title="메인" />

      <Navbar />

      <main>
        <Profile/>

        <div className="flex overflow-x-auto gap-4 mb-5">
          {data.map((x, y) => (
            <div className="flex-1" key={y}>
              <Link href={x[2]}>
                <a href={x[2]}>
                  <div className="card shadow-lg compact side bg-base-100">
                    <div className="flex-row items-center space-x-4 card-body">
                      <div className='w-10 h-10'>
                        <Image
                            src={x[0]}
                            className="rounded-full"
                            alt=''
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="card-title whitespace-nowrap">{x[1]}</h2>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>

        <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5">
          <div className="flex-row items-center space-x-4 card-body">
            <div className="flex-1">
              <h2 className="card-title inline-block ml-2">
                🔔 공지사항
              </h2>
              <p className="text-base-content text-opacity-40">
                신규서비스 및 패치사항을 안내합니다
              </p>
              <br />
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>작성자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>AllTime 온라인 강의 서비스 오픈</td>
                      <td>관리자</td>
                    </tr>
                    <tr>
                      <td>새학기 기념 이벤트</td>
                      <td>관리자</td>
                    </tr>
                    <tr>
                      <td>AllTime 베타 오픈</td>
                      <td>관리자</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Link href="#">
            <button className="btn btn-xl m-5" onClick={()=>alert('준비중입니다.')}>공지사항 더보기</button>
          </Link>
        </div>

        <div className="card row-span-3 shadow-lg compact bg-base-100 mb-5">
          <div className="flex-row items-center space-x-4 card-body">
            <div className="flex-1">
              <h2 className="card-title inline-block ml-2">
                🏆 인기 익명게시판
              </h2>
              <p className="text-base-content text-opacity-40">
                인기있는 익명게시글을 확인해보세요
              </p>
              <br />
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>조회수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>대학교 꼭 가야하나요?</td>
                      <td>326회</td>
                    </tr>
                    <tr>
                      <td>이건 좀 아닌것같음</td>
                      <td>164회</td>
                    </tr>
                    <tr>
                      <td>안쓰던 문제집 팝니다</td>
                      <td>97회</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Link href="#">
            <button className="btn btn-xl m-5" onClick={()=>alert('준비중입니다.')}>인기 익명게시판 더보기</button>
          </Link>
        </div>

        <div className="card shadow-lg compact bg-base-100 mb-5">
          <div className="flex-row items-center space-x-4 card-body">
            <div className="flex-1 overflow-x-auto">
              <h2 className="card-title inline-block ml-2">
                📰 입시 뉴스
              </h2>
              <p className="text-base-content text-opacity-40">
                입시와 관련된 뉴스를 확인해보세요
              </p>
              <br />
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>미리보기</th>
                      <th>조회수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2022학년도 OO대학교 수시모집 결과 발표</td>
                      <td>
                        2022학년도 OO대학교의 수시모집 결과가 발표되었다. 모든
                        학과 평균 경쟁률이 10:1로 치열한 경쟁이...
                      </td>
                      <td>1,362회</td>
                    </tr>
                    <tr>
                      <td>고교등급제 언제부터 시행?</td>
                      <td>
                        대학교의 학점제와 거의 비슷한 시스템을 고등학교에 도입한
                        고교학점제, 이 제도가 정식적으로 시행되는 일시는...
                      </td>
                      <td>1,148회</td>
                    </tr>
                    <tr>
                      <td>모고등학교에서 집단 확진</td>
                      <td>
                        OO시 OO구의 모고등학교에서 13명이 집단으로 확진판정을
                        받았습니다. 최초확진경로는 학원으로 보고 역학조사를
                        벌이고있습니다. 이에 교육청은...
                      </td>
                      <td>1,097회</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Link href="#">
            <button className="btn btn-xl m-5" onClick={()=>alert('준비중입니다.')}>입시 뉴스 더보기</button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
