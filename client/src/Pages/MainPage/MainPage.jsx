import React, {useState} from 'react';
import classes from "./MainPage.module.css";
import Menu from "../../Components/Menu/Menu";
import ConversationsList from "../../Components/ConversationsList/ConversationsList";
import ConversationWindow from "../../Components/ConversationWindow/ConversationWindow";
import CreateMessage from "../../Components/CreateMessage/CreateMessage";

const MainPage = () => {
  const [conversation, setConversation] = useState({});
  const [folder, setFolder] = useState('');

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.left}>
          <Menu setFolder={setFolder}/>
          <ConversationsList setConversation={setConversation} folder={folder}/>
        </div>
        <div className={classes.right}>
          {
            conversation.id
             ? <ConversationWindow conversationId={conversation.id} setConversation={setConversation}/>
             : <CreateMessage/>
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage;