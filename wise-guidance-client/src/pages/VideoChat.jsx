import { useState, useEffect } from "react";
import axios from "axios";
import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  StreamTheme,
  ParticipantView,
  CallControls,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";

import "../App.css";
import useAuth from "../contexts/authContext";

const apiKey = import.meta.env.VITE_STREAM_CHAT_API_KEY;

function VideoChat() {
  const navigate = useNavigate();
  const params = useParams();
  const [auth, setAuth] = useAuth();
  const [client, setClient] = useState();
  const [userName, setUserName] = useState(auth?.user.name);
  const [token, setToken] = useState("");
  const [callId, setCallId] = useState(params.callId);

  const [call, setCall] = useState();

  const getChatToken = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/communication/chat-token/${
          auth?.user?._id
        }`
      );
      setToken(data?.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.token) getChatToken();
  }, [client]);

  const user = {
    id: auth.user._id,
    name: userName,
  };

  const handleSubmit = () => {
    const client = new StreamVideoClient({ apiKey, user, token });
    setClient(client);
    const call = client.call("default", callId);
    setCall(call);
    call.join({ create: true });
  };

  if (!client) {
    return (
      <>
        <div className="container flex justify-center items-center h-screen ">
          <div className="form-container flex flex-col space-y-4">
            <input
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              placeholder="Enter User Token"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
            />
            <input
              placeholder="Enter Call id"
              value={callId}
              onChange={(e) => {
                setCallId(e.target.value);
              }}
            />
            <button
              className="bg-purple text-white p-2 rounded-xl font-semibold"
              onClick={handleSubmit}
            >
              {" "}
              Join Meeting{" "}
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>
    );
  }
}
export const MyUILayout = () => {
  const navigate = useNavigate();
  const call = useCall();

  const {
    useCallCallingState,
    useParticipantCount,
    useLocalParticipant,
    useRemoteParticipants,
  } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      {/* <MyParticipantList participants={remoteParticipants} /> */}
      {/* <MyFloatingLocalParticipant participant={localParticipant} /> */}
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={() => navigate(-1)} />
    </StreamTheme>
  );
};

export const MyParticipantList = (props) => {
  const { participants } = props;
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {participants.map((participant) => (
        <ParticipantView
          participant={participant}
          key={participant.sessionId}
        />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      <ParticipantView participant={participant} />
    </div>
  );
};

export default VideoChat;
