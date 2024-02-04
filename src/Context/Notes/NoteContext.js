import { createContext } from "react";

const NoteContext = createContext();
// Context -> The phenomeon which hold all the state corrosponding to notes so that the required state will be available for note component no matter how this component were nested

export default NoteContext;