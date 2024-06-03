import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "../App.css";

import { useState, useEffect } from "react";

const ChatArea = ({ userObj, token, channelId }) => {
  const user = { id: userObj._id, name: userObj.name };
  const [channel, setChannel] = useState();

  const apiKey = import.meta.env.VITE_STREAM_CHAT_API_KEY;
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", channelId, {
      image: "https://getstream.io/random_png/?name=react",
      name: "Chat",
    });

    setChannel(channel);
  }, [client, channelId]);

  if (!client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatArea;
