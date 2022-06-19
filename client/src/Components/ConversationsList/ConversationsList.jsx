import React, {useEffect, useState} from 'react';
import {ApiService} from "../../API/api.service";
import {useFetching} from "../../Hooks/useFetching";
import ConversationsListItem from "../ConversationsListItem/ConversationsListItem";
import Loader from "../UI/Loader/Loader";

const ConversationsList = (props) => {
  const {folder, setConversation} = props;
  const [conversationsList, setConversationsList] = useState([]);

  const [fetchConversations, isLoading] = useFetching(async () => {
    const response = await ApiService.getConversationsList({folder: folder});
    setConversationsList(response.data);
  })


  useEffect( () => {
    fetchConversations()
  },[folder]);

  return (
    <div>
      {
        isLoading
        ? <Loader/>
        : conversationsList.map((item) =>
            <ConversationsListItem
              key={item.id}
              item={item}
              setConversation={setConversation}
            />
          )
      }
    </div>
  );
};

export default ConversationsList;