export default function MsgMe(props: any) {
    return (
      <>
        <div className="msg-sys">
          <div className="msg-sys-text">
            <span>{props.text}</span>
          </div>
        </div>
      </>
    );
  }
  