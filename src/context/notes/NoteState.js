import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesinitial = [
    {
      _id: "61c9c8591377a037606ad946as",
      user: "61bd8314a78532d34f0f1b1f",
      title: "here with me",
      description: "i need you",
      tag: "personal",
      date: "2021-12-27T14:06:17.272Z",
      __v: 0,
    },
    {
      _id: "61c9c8591377a037606ad94as8",
      user: "61bd8314a78532d34f0f1b1f",
      title: "here with me",
      description: "i need you",
      tag: "personal",
      date: "2021-12-27T14:06:17.807Z",
      __v: 0,
    },
    {
      _id: "61caac370e78a39662488b7cas",
      user: "61bd8314a78532d34f0f1b1f",
      title: "hello",
      description: "lets satrt the day",
      tag: "personal",
      date: "2021-12-28T06:18:31.491Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesinitial);
  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
