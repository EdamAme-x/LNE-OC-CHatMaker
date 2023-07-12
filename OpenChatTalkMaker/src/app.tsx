import "./assets/styles/app.css";
import MessageMe from "./message-me.tsx";
import MessageYou from "./message-you.tsx";
import MessageSys from "./message-sys.tsx";
import { useRef, useState } from "preact/hooks";

export default function App() {
  const [name, setName] = useState("amex");
  const nameRef = useRef<HTMLInputElement>(null);

  const [ocName, setOcName] = useState("amex-patry?????");
  const ocRef = useRef<HTMLInputElement>(null);

  const [people, setPeople] = useState("10");
  const peopleRef = useRef<HTMLInputElement>(null);

  const [chat, setChat] = useState<JSX.Element[]>([<div></div>]);

  const [sysMsg, setSysMsg] = useState("");
  const sysRef = useRef<HTMLInputElement>(null);

  const [otherMsg, setOtherMsg] = useState("");
  const otherRef = useRef<HTMLInputElement>(null);

  const [otherNameMsg, setOtherNameMsg] = useState("");
  const otherNameRef = useRef<HTMLInputElement>(null);

  const [otherTimeMsg, setOtherTimeMsg] = useState("");
  const otherTimeRef = useRef<HTMLInputElement>(null);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null); // 追加: 選択されたアイコンのBase64エンコード

  // メッセージの追加
  const addMessage = (message: JSX.Element) => {
    let copyChat: JSX.Element[] = [...chat];
    copyChat.push(message);
    setChat(copyChat);
  };

  // システムメッセージの追加
  const addSystemMessage = () => {
    const systemMessage = sysRef.current!.value;
    if (systemMessage) {
      const message = <MessageSys text={systemMessage} />;
      addMessage(message);
      setSysMsg("");
    }
  };

  // アイコンの選択
  const handleIconSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result?.toString() || null;
        setSelectedIcon(base64Data);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedIcon(null);
    }
  };

  return (
    <div>
      <div className="app">
        <h2>Screen</h2>
        <div className="screen">
          <div className="screen-header">
            <div className="screen-header-left">
              {selectedIcon && (
                <img src={selectedIcon} alt="header-left" height="37.5px" />
              )}
            </div>
            <div className="screen-header-name">
              {ocName.length > 10
                ? ocName.substring(0, 7) + "..." + ocName.slice(-1)
                : ocName}{" "}
              ({people})
            </div>
            <div className="screen-header-right">
              <img src="/header-right.png" alt="header-right" height="37.5px" />
            </div>
          </div>
          <div className="screen-body">
            <div className="screen-body-msg">
              <MessageMe
                text="hello! こんにちは！ uoooooooooooooooo!"
                read="15"
                time="22:20"
              />
              <MessageMe
                text="hello! こんにちは！ uoooooooooooooooo!"
                read="15"
                time="22:20"
              />
              <MessageYou
                text="hello! こんにちは！ uoooooooooooooooo!"
                read="15"
                time="22:20"
                image="https://dummyimage.com/300"
                name="Raiden@mymy"
              />
              <MessageSys text="hello" />
              {chat}
            </div>
          </div>
          <div className="screen-input">
            <div className="screen-input-box">
              {name.length < 10 ? name : name.substring(0, 9) + "..."}
            </div>
            <img src="/input.jpg" alt="input" width="100%" />
          </div>
        </div>
        名前{" "}
        <input
          type="text"
          onInput={() => {
            setName(nameRef.current!.value);
          }}
          value={name}
          ref={nameRef}
        />
        OC名{" "}
        <input
          type="text"
          onInput={() => {
            setOcName(ocRef.current!.value);
          }}
          value={ocName}
          ref={ocRef}
        />
        人数{" "}
        <input
          type="number"
          onInput={() => {
            setPeople(peopleRef.current!.value);
          }}
          value={people}
          ref={peopleRef}
        />
        システムメッセージ{" "}
        <input
          type="text"
          value={sysMsg}
          onInput={() => {
            setSysMsg(sysRef.current!.value);
          }}
          ref={sysRef}
        />
        <button onClick={addSystemMessage}>システムメッセージを追加</button>
        他人のメッセージ <br />
        アイコン <input type="file" onChange={handleIconSelect} />
        名前{" "}
        <input
          type="text"
          value={otherNameMsg}
          onInput={() => {
            setOtherNameMsg(otherNameRef.current!.value);
          }}
          ref={otherNameRef}
        />
        メッセージ{" "}
        <input
          type="text"
          value={otherMsg}
          onInput={() => {
            setOtherMsg(otherRef.current!.value);
          }}
          ref={otherRef}
        />
        時間{" "}
        <input
          type="text"
          value={otherTimeMsg}
          onInput={() => {
            setOtherTimeMsg(otherTimeRef.current!.value);
          }}
          ref={otherTimeRef}
        />
        <button
          onClick={() => {
            addMessage(<MessageYou text={otherRef.current!.value} name={otherNameRef.current!.value} time={otherTimeRef.current!.value} image={selectedIcon}/>);
          }}
        >
          システムメッセージを追加
        </button>
      </div>
    </div>
  );
}
