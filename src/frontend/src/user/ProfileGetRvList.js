import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ProfileGetRvList(props) {
    const {user}=props;
    const [rvlist,setRvlist]=useState([]);
    const navi=useNavigate();
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const marks = [
        {value: 0, label: '🤬'},
        {value: 10, label: '😡'},
        {value: 20, label: '️😠'},
        {value: 30, label: '🙁'},
        {value: 40, label: '😐'},
        {value: 50, label: '🙂'},
        {value: 60, label: '😄'},
        {value: 70, label: '😆'},
        {value: 80, label: '😘'},
        {value: 90, label: '🥰'},
        {value: 100, label: '😍'}
    ];
    const getrvlist=()=>{
        let rvlistURL=localStorage.url+"/getrv?ur_num="+user;
        axios.get(rvlistURL).then(res=>setRvlist(res.data))
    }
    const spinfoClick=(item)=>{
        navi(`/shop/detail/${item.pd_num}/${item.sp_num}/1`);
    }
    useEffect(()=>getrvlist(),[user])
    return (
        <ul>
            <div>받은 후기 리스트</div>
            {rvlist.map((rv,i)=>
                <li key={i} className={'mypage_li'}>
                    <div>
                        <div style={{display:"flex"}}>
                            <img alt={''} src={spURL+rv.img_name} className={'mypage_sp_img'}
                                onClick={()=>spinfoClick(rv)}/>
                            <div className={'mypage_sp_title'}>{rv.sp_title}</div>
                        </div>
                        <div >
                            후기 : {rv.rv_txt}
                            &nbsp; ({marks[rv.rv_tmp/10].label + rv.rv_tmp}℃)
                        </div>
                    </div>
                </li>)
            }
        </ul>
    );
}

export default ProfileGetRvList;