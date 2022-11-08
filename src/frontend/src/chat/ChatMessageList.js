import React, {useEffect, useState} from 'react';
import axios from "axios";
import ChatMessage from "./ChatMessage";

function ChatMessageList(props) {
    const [chatList, setChatList] = useState([]);
    const [sender, setSender]=useState('');
    const {cr_num, ur_num}=props;

    const getChatMessage=()=>{
        let url="http://localhost:9005/chat/cm?cr_num="+cr_num;
        axios.get(url).then(res=>{
            setChatList(res.data);
            setSender(res.data.sender);
        })
    }
    const addMsg=(msgData)=>{
        setChatList(chatList.concat(msgData))
    }

    useEffect(()=>{
        getChatMessage();
    },[cr_num,chatList])
    return (
        <div className={'msg_list_box'}>
            <h1>{sender}</h1>
            <div className={'msg_list'}>
            {
                chatList &&
                chatList.map((cl,i)=>
                    <div key={i} style={{display:"block",height:'70px'}}>
                        {
                            cl.sender===ur_num
                            ?
                            <div  className={'i-msg-box'}>
                                {cl.msg}<br/>
                                {cl.cm_wdate}
                            </div>
                            :
                            <div key={i} className={'u-msg-box'}>
                                {cl.msg}
                                <br/>
                                {cl.cm_wdate}
                            </div>
                        }
                    </div>
                )
            }
            </div>
            <ChatMessage cr_num={cr_num} addMsg={addMsg} style={{width:'100%'}}/>
        </div>
    );
}

export default ChatMessageList;