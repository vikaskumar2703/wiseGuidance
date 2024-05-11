import { createContext } from "react";
import { useContext, useState } from "react";

export const MenteeContext = createContext();
// you can provide with default contetxt within create context or explicitly create using "value

export const MenteeContextProvider = ({ children }) => {
  const [mentor, setMentor] = useState({});

  useEffect(() => {
    let existingMentor = localStorage.getItem("mentor");
    if (existingMentor) setMentor(JSON.parse(existingMentor));
  }, []);

  return (
    <MentorContext.Provider value={[mentor, setMentor]}>
      {children}
    </MentorContext.Provider>
  );
};

//function for using created context
export default function useMentor() {
  return useContext(MentorContext);
}
