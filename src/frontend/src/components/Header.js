import React, {useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import '../css/Header.css';
import axios from "axios";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import mainlogo from '../image/mainlogo.png';
import SearchIcon from '@material-ui/icons/Search';
import {
    Avatar, Badge,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Menu,
    MenuItem, Slide, TextField,
} from "@mui/material";
import {
    AccountBox,
    AccountCircle,
    ForumRounded,
    HomeRounded,
    KeyboardArrowDown,
    KeyboardArrowUp,
    ShoppingCartRounded,
    SmsRounded
} from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Header(props) {
    const [prf_nick, setPrf_nick]=useState('');
    const [prf_img, setPrf_img]=useState('');
    const [openUp, setOpenUp] = useState('');
    const [showlist,setShowlist]=useState('');
    const [searchword,setSearchword]=useState('');
    const handleOpenUp = () => {
        setOpenUp(true);
    };

    const handleCloseDown = () => {
        setOpenUp(false);
    };

    const navi = useNavigate();
    const prfUrl="https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/prf_img/";
    const ur_num=sessionStorage.ur_num;
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })}
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const loginClose = () => {
        setOpen(false);
    };
    useEffect(()=>{
        setPrf_nick(sessionStorage.prf_nick);
    },[]);
    useEffect(()=>{
        setPrf_img(sessionStorage.prf_img);
    },[]);

    const [ur_id, setUr_id]=useState('');
    const [ur_pw, setUr_pw]=useState('');
    const loginRef=useRef();
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginRef.current.click(); // Enter ????????? ?????? ?????? ????????? ??????
        }
    };

    const onBtnLogin=(e)=>{
        e.preventDefault();
        let url=sessionStorage.url+"/login/check";
        axios.post(url,{ur_id,ur_pw})
            .then(res=>{
                if (res.data.check===1){
                    sessionStorage.loginok='yes';
                    sessionStorage.ur_num=res.data.ur_num;
                    sessionStorage.ur_id=ur_id;
                    sessionStorage.prf_nick=res.data.prf_nick;
                    sessionStorage.prf_img=res.data.prf_img;
                    window.location.reload();
                } else {
                    alert("????????? ?????? ??????????????? ??????????????????");
                    setUr_id('');
                    setUr_pw('');
                }
            })
    }

    const actions = [
        { icon: <AccountBox onClick={()=>{navi("/mypage/1");setShowlist(0)}}/>, name: '???????????????' },
        { icon: <ForumRounded onClick={()=>{navi("/chat/0");setShowlist(0)}}/>, name: '??????' },
        { icon: <ShoppingCartRounded onClick={()=>{navi("/shop/list/1");setShowlist(2)}}/>, name: '?????????' },
        { icon: <HomeRounded onClick={()=>{navi("/feed/list");setShowlist(1)}}/>, name: '?????????' },
    ];
    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const [msgCnt,setMsgCnt]=useState(0);

    const getMsgCntNoti=()=>{
        if(ur_num!=null){
            let getMsgCntNotiUrl=localStorage.url+"/chat/cntnoti?ur_num="+ur_num;
            axios.get(getMsgCntNotiUrl).then(res=>{
                setMsgCnt(res.data);
            })
        }
    }
    const seachclick=()=>{
        navi(`/search?word=${searchword}`);
        setShowlist(0);
    }
    const seachkeydown=(e)=>{
        if(e.key==="Enter"){
            seachclick();
        }
    }
    useEffect(()=>getMsgCntNoti(),[])
    return (
        <header className={"header"}>
        <ul className='menu'>

            <div className='menu_left'>
                <li>
                    <img src={mainlogo} style={{width:'80px', cursor:"pointer"}} onClick={()=>{navi("/"); setShowlist(0)}}/>
                </li>
                <li>
                    <NavLink style={{color:(showlist===1)?'#35c5f0':''}} onClick={()=>setShowlist(1)} to={"/feed/list"}>?????????</NavLink>
                </li>
                <li>
                    <NavLink style={{color:(showlist===2)?'#35c5f0':''}} onClick={()=>setShowlist(2)} to={"/shop/list/1"}>?????????</NavLink>
                </li>
                <div className={'search_bar'}>
                    <input type={'text'} className={'form-control'}
                           placeholder={'?????? ??????'} onKeyDown={seachkeydown}
                           value={searchword} onChange={(e)=>setSearchword(e.target.value)}/>
                    &nbsp;&nbsp;<button className={'btn_search_bar'} onClick={seachclick} ><SearchIcon/></button>
                </div>

            </div>
            <div className='menu_right'>
            {
                sessionStorage.loginok==null?
                    <div style={{float:"right", margin:'2%',height:'100px',paddingTop:'20px'}}>
                        <NavLink style={{color:(showlist===3)?'#35c5f0':''}} onClick={()=>setShowlist(3)} to={"/register"}>????????????</NavLink>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Fab variant="extended"
                         style={{
                             backgroundColor:'#35c5f0', color:"white"}}
                            onClick={handleClickOpen}>
                        <AccountCircle/>&nbsp;?????????
                    </Fab>
                    </div>
                    :
                    <div className={'loginavt'}>
                        <div className={'ziptalk'} onClick={()=>{navi("/chat/0"); setShowlist(4)}} style={{color:(showlist===4)?'#35c5f0':'',cursor:"pointer"}}>
                        <b>??????</b>&nbsp;
                        <Badge badgeContent={msgCnt} color={"error"} style={{color:'#828C94'}}>
                            <SmsRounded />

                        </Badge>
                        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Avatar src={prfUrl+prf_img} onClick={handleClick} className={'profilehover'} style={{cursor:"pointer"}}/>&nbsp;&nbsp;
                        <b>{prf_nick}?????? ????????????</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant={"contained"} style={{backgroundColor:'#35c5f0', height:'40px'}} onClick={handleClick2}>?????????<KeyboardArrowDown/></Button>
                        {/*<Fab className={'insertformbtn'} style={{backgroundColor:'#35c5f0', color:'white'}} variant="extended" onClick={handleClick2}>*/}
                        {/*    ?????????<KeyboardArrowDown/>*/}
                        {/*</Fab>*/}
                    </div>
                }
            </div>
        </ul>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={loginClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {/*<DialogTitle>*/}
                    {<img src={mainlogo} style={{width:'240px'}}/>}
                {/*</DialogTitle>*/}
                <DialogContent>
                    {/*<DialogContentText>*/}
                        <TextField label={'ID'} name={'ur_id'} value={ur_id} required onKeyPress={handleOnKeyPress} onChange={(e)=>setUr_id(e.target.value)}/><br/><br/>
                        <TextField label={'Password'} name={'ur_pw'} value={ur_pw} type={"password"} onKeyPress={handleOnKeyPress} required
                                   onChange={(e)=>setUr_pw(e.target.value)}/><br/>
                    {/*</DialogContentText>*/}
                </DialogContent>
                <DialogActions>
                    <Button type={"button"} fullWidth variant={"contained"} style={{backgroundColor:'#35c5f0'}}
                            ref={loginRef}
                            onClick={onBtnLogin}>?????????</Button>
                </DialogActions>
            </Dialog>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/*onClick={()=>{navi("/chat/0"); setShowlist(4)}}*/}
                <MenuItem onClick={(e)=>{
                    handleClose();
                    navi("/profile/"+ur_num);
                    setShowlist(0);
                }}>?????????</MenuItem>
                <MenuItem onClick={(e)=>{
                    handleClose();
                    navi("/mypage/1");
                    setShowlist(0);
                }}>???????????????</MenuItem>
                <MenuItem onClick={(e)=>{
                    handleClose();
                    sessionStorage.removeItem("loginok");
                    sessionStorage.removeItem("ur_id");
                    sessionStorage.removeItem("prf_nick");
                    sessionStorage.removeItem("prf_img");
                    sessionStorage.removeItem("ur_num");
                    setShowlist(0);
                    navi("/");
                }}>????????????</MenuItem>
            </Menu>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
            >
                <MenuItem onClick={(e)=>{
                    handleClose2();
                    navi("/feed/insertform");
                    setShowlist(1);
                }}><div><b>????????? ?????????</b><br/><span style={{color:'#828C94', fontSize:'0.8em'}}>?????? ????????? ?????? ????????? ??????????????????</span></div></MenuItem>
                <MenuItem onClick={(e)=>{
                    handleClose2();
                    navi("/shop/insert");
                    setShowlist(2);
                }}><div><b>????????? ?????????</b><br/><span style={{color:'#828C94', fontSize:'0.8em'}}>????????? ?????? ?????? ???????????? ????????????</span></div></MenuItem>
            </Menu>
            <SpeedDial
                onClick={scrollToTop}
                className="scroll__container"
                ariaLabel="SpeedDial openIcon example"
                icon={<SpeedDialIcon openIcon={<KeyboardArrowUp />} />}
                onClose={handleCloseDown}
                onOpen={handleOpenUp}
                open={openUp}
                FabProps={{style: { backgroundColor: "#35c5f0" } }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        style={{backgroundColor:'red'}}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleCloseDown}
                    />
                ))}
            </SpeedDial>

        </header>
    );
}

export default Header;