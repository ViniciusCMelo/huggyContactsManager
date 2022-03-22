import { createContext } from "react";

const ContactsContext = createContext({
  contacts: {},
  setContacts: (contact) => {}
});

export default ContactsContext;
