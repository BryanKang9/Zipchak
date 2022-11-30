import React from 'react';
import ChatNotification from "../chat/ChatNotification";
import ReviewNotification from "../shop/ReviewNotification";
import Slider from "react-slick";
import "../css/Home.css";
import mainad from "../image/mainad.webp";
import mainad2 from "../image/mainad2.webp";
import mainad3 from "../image/mainad3.jpg";
import christmas from "../image/christmas.png";
import friends from "../image/friends.png";
import room from "../image/room.png";
import chat from "../image/chat.png";

function Home(props) {
    localStorage.url=process.env.REACT_APP_BACK_URL;
    // console.log(localStorage.url);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:1000,
        arrows: false
    };

    return (
        <div style={{margin:"auto", width:'70%', minWidth:'1000px'}}>
            <ChatNotification/>
            <ReviewNotification/>
            <Slider {...settings}>
                <div>
                    <section className={'home_box'}>
                        <div className={'maintxt'}>
                            <h1><strong>예쁜 방에서 나혼자 산다! 🧡</strong></h1>
                            <h1>🏅 12월 인기 집들이 BEST 🏅</h1><br/>
                            <span>10평 방 꾸미기🌙미드센츄리st를 꿈꾸며</span><br/>
                            <span>매일 퇴근이 기다려지는나의 2평 작은 방</span>
                        </div>
                        <div>
                            <img src={room} style={{width:'600px'}}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'home_box2'}>
                        <div className={'maintxt'}>
                            <h1><strong>진아가문제야😒</strong></h1>
                            <h1>문제야 문제 온 세상속에</h1><br/>
                            <span>사고좀 그만치고다녀요</span><br/>
                            <span>학원좀 나와요</span>
                        </div>
                        <div>
                            <img src={mainad} style={{width:'650px'}}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'home_box3'}>
                        <div className={'maintxt'}>
                            <h1><strong>이제 곧 크리스마스🎄</strong></h1>
                            <h1>🎅산타도 놀랄만한 나의 인테리어</h1><br/>
                            <span>사실 산타는 없어요</span><br/>
                        </div>
                        <div>
                            <img src={christmas} style={{width:'400px', marginLeft:'10%'}}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'home_box4'}>
                        <div className={'maintxt'}>
                            <h1><strong>나만의 공간, 나만의 색으로🎨</strong></h1>
                            <h1>유저들의 인테리어 시공 리뷰</h1><br/>
                            <span>없었을 때로 돌아갈 수 없는내돈내산 살림템 5</span><br/>
                        </div>
                        <div>
                            <img src={chat} style={{width:'50%'}}/>
                        </div>
                    </section>
                </div>
                <div>
                    <section className={'home_box5'}>
                        <div className={'maintxt'}>
                            <h1><strong>착한 사람들만 있어요😊</strong></h1>
                            <h1>믿으세요</h1><br/>
                            <span>우리는 모두 친구</span><br/>
                        </div>
                        <div>
                            <img src={friends} style={{width:'50%', margin:'auto'}}/>
                        </div>
                    </section>
                </div>
            </Slider>
            <div>
                <img src={mainad3}/>
                {/*<p className="animation">집이 최고야</p>*/}
                <h2>
                    <span>집</span>
                    <span>이</span>
                    <span>최</span>
                    <span>고</span>
                    <span>야</span>
                </h2>
            </div>
        </div>
    );
}

export default Home;