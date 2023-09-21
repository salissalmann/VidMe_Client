import React, { useState, useEffect, useRef } from "react";
import "./Form.css";
import InfiniteScroll from "react-infinite-scroll-component";
import NavigationBar from '../../GlobalComponents/SeekerNavbar/Navbar';
import Spinner from "../Spinner/Spinner";
import Loader from "../Loader/Loader";
import MailBox from "../../Images/Images/NoMsg.png";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function Form(props) {
  const [Info, setInfo] = useState([]);
  const [Increment, setIncrement] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [Connection, setConnection] = useState([]);
  const [UserInfo, setUserInfo] = useState([]);
  const [Check, setCheck] = useState(1);
  const [Check2, setCheck2] = useState(1);
  const [Messages, setMessages] = useState({ Messages: [] });
  const [MessageId, setMessageId] = useState('');
  const [Text, setText] = useState('');
  const [socket, setsocket] = useState(null);
  const [Reciever, setReciever] = useState('');
  const messageRef = useRef(null);
  const [OnlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5050');
    setsocket(socket);
  }, [Check2])

  useEffect(() => {
    if (messageRef?.current && Messages) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [Messages])

  useEffect(() => {
    socket?.on('getUsers', users => {
      setOnlineUser(users);
    })
    socket?.on('getMessage', ({ MessageId, SenderId, text, Reciever }) => {
      const newItem = { SenderId: SenderId, text: text };
      {
        Messages && (
          setMessages(prevItems => [...prevItems, newItem])
        )
      }
    });

    setCheck2(2);
  }, [Check2])


  const { IdGlobal } = useParams();

  const FetchData = async () => {
    const formData = {
      Id: IdGlobal,
    }
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/message/FindConnection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const jsonData = await response.json();
    setConnection(await jsonData);
    if (Connection.length < 7) {
      document.getElementById('scrollable').style.overflowY = 'hidden';
    }
    setCheck(2);
    const firstThreeProfiles = Connection?.slice(0, 7);
    setInfo(firstThreeProfiles);
  }

  const FetchMoreData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const ThreeProfiles = Connection.slice(Increment, Increment + 3);
      setInfo(prevInfo => [...prevInfo, ...ThreeProfiles]);
      const Num = Increment;
      setIncrement(Num + 3);
      setIsLoading(false);
    }, 2000);
  }

  const FetchUserData = async () => {
    const formData = {
      Id: IdGlobal,
    }
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/FindUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const jsonData = await response.json();
    setUserInfo(await jsonData);
    await FetchData();
  };

  const OpenConvo = async (Info) => {
    const formData = {
      MessageId: Info._id,
    }
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/conversation/FindConversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const jsonData = await response.json();
    setMessages(await jsonData[0].content);
    setMessageId(Info._id);
    setReciever(Info.user._id);
    document.getElementById('TopImg').style.display = 'flex';
    document.getElementById('Input').style.display = 'flex';
    document.getElementById('Sending').style.display = 'flex';
    document.getElementById('InputOuter').style.marginTop = '10px';
    document.getElementById('InputOuter').style.border = 'none';
    document.getElementById('TopImg').src = Info.user.img;
    document.getElementById('TopName').style.display = 'flex';
    document.getElementById('Online').style.display = 'flex';
    document.getElementById('Offline').style.display = 'flex';
    document.getElementById('TopName').innerHTML = Info.user.FirstName + ' ' + Info.user.LastName;
    document.getElementById('TopMessage').style.display = 'none';
    document.getElementById('Message').style.borderRight = 'none';
  };

  const SendMsg = async () => {
    if (Text !== '') {
      socket?.emit('sendMessage', {
        MessageId: MessageId,
        SenderId: IdGlobal,
        text: Text,
        Reciever: Reciever
      });

      const formData = {
        MessageId: MessageId,
        SenderId: IdGlobal,
        text: Text,
      }
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/conversation/Conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();
      if (jsonData) {
        const formData = {
          MessageId: MessageId,
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/conversation/FindConversation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const jsonData = await response.json();
        setMessages(await jsonData[0].content);
      }
      document.getElementById('MessageContent').value = '';
    }
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      SendMsg();
    }
  };

  useEffect(() => {
    FetchUserData();
    setTimeout(() => {
      document.getElementById('Main').style.display = 'flex';
      document.getElementById('Loader').style.display = 'none';
    }, 2000);
  }, [Check]);

  let matchedUser = false;

  return (
    <>
      <NavigationBar />

      <div style={{ display: 'none' }} id="Main">
        <div>
          <div style={{ display: 'inline-flex' }}>
            <img src={UserInfo.img} alt="Profile" className="rounded-circle" width="70" height="76" style={{ marginTop: '31px' }} />
            <div style={{ marginTop: '34px' }}>
              <h4 style={{ marginLeft: '9px', marginTop: '7px' }}>{UserInfo.FirstName} {UserInfo.LastName}</h4>
              <a href="/" style={{ textDecoration: 'none', color: 'black', marginLeft: '-49px' }}>My Account</a>
            </div>
          </div>
          <div className="Line">
          </div>
          <h3 className="HM-h3" style={{ marginLeft: '-173px', marginTop: '5px', color: '#00547d' }}>
            Messages
          </h3>
          <div>
            <div class="InputContainer">
              <input type="text" name="text" class="input" id="input" placeholder="Search" />
              <label for="input" class="labelforsearch">
                <svg viewBox="0 0 512 512" class="searchIcon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
              </label>
            </div>
          </div>
          <div className="custom-scrollbar" id="scrollable">
            <div className="content">
              <InfiniteScroll
                dataLength={Info.length}
                next={FetchMoreData}
                hasMore={Info.length < Connection.length}
                scrollableTarget="scrollable"
                endMessage={<p><b>End of Connections.</b></p>}
              >
                <div>
                  {
                    Info?.map((person, index) => {
                      matchedUser = OnlineUser.find(user => user.userId === person.user._id);
                      return (
                        <div key={index} style={{ width: '260px', padding: '10px', borderBottom: '3px solid', borderBottomColor: 'lightslategrey', margin: 'auto', maxWidth: '260px', background: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', marginTop: '6px', marginLeft: '17%' }} onClick={() => OpenConvo(person)}>
                          <div style={{ display: 'inline-flex', cursor: 'pointer', minWidth: '150px', marginLeft: '-160px' }}>
                            <img src={person.user.img} alt="Profile" className="rounded-circle" width="53" height="56" style={{ marginTop: '11px' }} />
                            <div style={{ marginTop: '41px' }}>
                              <h6 className='HM-h6' style={{ marginLeft: '12px', marginTop: '-23px', fontWeight: '800' }}>{person.user.FirstName}</h6>
                            </div>
                          </div>
                          {matchedUser ? (<div className="online-circle"></div>) :
                            (<div className="offline-circle"></div>)}
                        </div>
                      )
                    })
                  }
                </div>
                <div style={{ display: isLoading ? 'block' : 'none' }}><Spinner /></div>
              </InfiniteScroll>
            </div>
          </div>
        </div>

        <div className="Centre">
          <div style={{ minWidth: '100%', height: '80px', display: 'flex', border: '2px solid lightgray' }}>
            <img src={props.Img} alt="Profile" className="rounded-circle" width="53" height="56" style={{ marginLeft: '7px', marginTop: '15px', border: '1px solid black', display: 'none' }} id="TopImg" />
            <h5 style={{ marginLeft: '12px', marginTop: '20px', fontWeight: '700', display: 'none' }} id="TopName">Hasan</h5>
            {matchedUser ? (<div className="StatusOnline" id="Online">User Active</div>) :
              (<div className="StatusOffline" id="Offline">User Inactive</div>)}
            <h4 style={{ marginLeft: '33%', marginTop: '25px' }} id="TopMessage">Click to Open Conversation</h4>
          </div>
          <div className="Message" id="Message">
            <div>
              <div>
                {Messages.length > 0 ? (
                  Messages.map((person, index) => (
                    <div key={index}>
                      {person.SenderId === IdGlobal ? (
                        <>
                          <div style={{ maxWidth: '32%', borderRadius: '12px', backgroundColor: '#42d7f5', marginTop: '20px', marginLeft: 'auto', marginRight: '20px', padding: '12px', color: 'white', minHeight: '50px', height: 'auto', whiteSpace: 'pre-wrap' }}>
                            <div class="d-flex justify-content-start" ref={index === Messages.length - 1 ? messageRef : null}>
                              {person.text}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div style={{ maxWidth: '32%', borderRadius: '12px', backgroundColor: 'rgb(237, 246, 254)', marginTop: '20px', marginLeft: '20px', padding: '12px', minHeight: '50px', height: 'auto', whiteSpace: 'pre-wrap' }}>
                          <div class="d-flex justify-content-start" ref={index === Messages.length - 1 ? messageRef : null}>
                            {person.text}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div>
                    <img src={MailBox} alt="MailBox" style={{ height: '350px', marginTop: '30px' }} />
                    <h4>Looking Empty</h4>
                    <h6>Click on a Conversation to Open</h6>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="Type" id="InputOuter" style={{ display: 'inline-flex' }}>
            <div id="Input" style={{ display: 'none' }} className="InputLength">
              <div class="Message-custom">
                <input title="Write Message" tabindex="i" pattern="\d+" placeholder="Type Message.." class="MsgInput" type="text" id="MessageContent" onChange={handleText} onKeyDown={handleKey} />
              </div>
            </div>
            <div id="Sending" style={{ display: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-microphone" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round" className="MicroPhoneSVG">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <path d="M8 21l8 0" />
                <path d="M12 17l0 4" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round" className="AttachSVG">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l6 0" />
                <path d="M12 9l0 6" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class={`icon icon-tabler icon-tabler-send`} width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round" className="SendSVG" onClick={() => SendMsg()}>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 14l11 -11" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} id="Loader">
        <Loader />
      </div>
    </>
  );
}
