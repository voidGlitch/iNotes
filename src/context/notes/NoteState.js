import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Shreshthav Bisht",
    class: "12th",
  };
  const [state, setstate] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "miku Bisht",
        class: "15th",
      });
    }, 3000);
  };
  return (
    <noteContext.Provider value={{ state, update }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
