import React, { createContext, useContext, useMemo, useState } from 'react';

const ContactsPageLeadContext = createContext({
  tabPageLead: '',
  setTabPageLead: () => {},
  filterTableContact: {},
  filterTableAppointment: {},
});
export const useContactPageLead = () => useContext(ContactsPageLeadContext);

const ContactPageLeadProvider = ({ children }) => {
  //!State
  const [tabPageLead, setTabPageLead] = useState('personal');

  const [filterTableContact, setFilterTableContact] = useState({
    fullname: '',
    phoneNumber: '',
    startAssignDate: '',
    endAssignDate: '',
    reCallDate: '',
    branch: '',
    service: '',
    telesales: [],
    fanpage: [],
  });

  const [filterTableAppointment, setFilterTableAppointment] = useState({
    name: '',
    date: '',
    phoneNumber: '',
    service: '',
    telesales: [],
    status: '',
  });

  const [filterTableArchives, setFilterTableArchives] = useState({
    startInteractiveDate: '',
    endInteractiveDate: '',
    startFirstAssignDate: '',
    endFirstAssignDate: '',
    startAssignDate: '',
    endAssignDate: '',
    fullname: '',
    phoneNumber: '',
    service: '',
    branch: '',
    isDuplicatePhoneNumber: false,
  });

  const [filterTableDataPage, setFilterTableDataPage] = useState({
    startInteractiveDate: '',
    endInteractiveDate: '',
    startFirstAssignDate: '',
    endFirstAssignDate: '',
    startAssignDate: '',
    endAssignDate: '',
    fullname: '',
    phoneNumber: '',
    service: '',
    branch: '',
    telesales: [],
    fanpage: [],
    isBadPhoneNumber: false,
    fanpageIDs: '',
  });

  const value = useMemo(() => {
    return {
      tabPageLead,
      setTabPageLead,
      filterTableContact,
      setFilterTableContact,
      filterTableAppointment,
      setFilterTableAppointment,
      filterTableArchives,
      setFilterTableArchives,
      filterTableDataPage,
      setFilterTableDataPage,
    };
  }, [
    tabPageLead,
    setTabPageLead,
    filterTableContact,
    setFilterTableContact,
    filterTableAppointment,
    setFilterTableAppointment,
    filterTableArchives,
    setFilterTableArchives,
    filterTableDataPage,
    setFilterTableDataPage,
  ]);

  //! Render

  return <ContactsPageLeadContext.Provider value={value}>{children}</ContactsPageLeadContext.Provider>;
};

export default ContactPageLeadProvider;
