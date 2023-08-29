import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateNewContact from '@src/components/contacts/add-contact';
import DeleteCreatedContact from '@src/components/contacts/delete-contact';
import EditCreatedContact from '@src/components/contacts/edit-contact';
import ContactIcon from '@src/components/icons/contact';
import Delete from '@src/components/icons/delete';
import Loader from '@src/components/loader';
import { LOCK_ROUTE, ONBOARDING_ROUTE } from '@src/helpers/constants/routes';
import { ContactDetails } from '@src/interfaces-and-types/home-state';
import { OnboardingStatus } from '@src/interfaces-and-types/onboarding-flow';
import { fetchAccountsState, homeSelectors } from '@src/pages/home/homeSlice';
import {
  fetchOnboardingState,
  onboardingSelectors,
} from '@src/pages/onboarding-flow/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { getShape, truncateWordAtIndex } from '@src/services/utils';

import { fetchSettingsState } from '../settingsSlice';

const ContactList = () => {
  const [loading, setLoading] = useState(true);
  const [addContact, setAddContact] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [deleteContact, setDeleteContact] = useState(false);
  const [clickedContact, setClickedContact] = useState<ContactDetails>();

  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const homeState = useAppSelector(homeSelectors);
  const onboardingState = useAppSelector(onboardingSelectors);

  const fetchSettings = useCallback(async () => {
    try {
      await appDispatch(fetchSettingsState()).unwrap();
      await appDispatch(fetchAccountsState()).unwrap();
      setLoading(false);

      if (onboardingState.onboardingStatus !== OnboardingStatus.COMPLETED)
        navigate(ONBOARDING_ROUTE);
      else if (!homeState.isLogedIn) navigate(LOCK_ROUTE);
    } catch (err) {
      setLoading(false);
    }
  }, [
    appDispatch,
    setAddContact,
    setLoading,
    fetchAccountsState,
    fetchSettingsState,
    fetchOnboardingState,
  ]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const groupContactsByFirstLetter = (
    contacts: Record<string, ContactDetails>
  ) => {
    const groupedContacts: Record<string, ContactDetails[]> = {};

    Object.values(contacts).forEach((contact) => {
      const firstLetter = contact.username.charAt(0).toUpperCase();

      if (!groupedContacts[firstLetter]) {
        groupedContacts[firstLetter] = [];
      }
      groupedContacts[firstLetter].push(contact);
    });

    return groupedContacts;
  };

  const currentStatus = (): string => {
    switch (true) {
      case addContact === true:
        return 'New Contact';
      case editContact === true:
        return 'Edit Contact';
      case deleteContact === true:
        return 'Delete Contact';
      default:
        return 'Contacts';
    }
  };

  const groupedContacts =
    !loading &&
    homeState.activeAccount.contacts &&
    groupContactsByFirstLetter(homeState.activeAccount.contacts);

  return loading ? (
    <Loader />
  ) : (
    <div className="p-3 mt-5 h-full w-full">
      <div className="justify-start items-start space-y-2">
        <div className="flex flex-row justify-between">
          <p className="text-xl text-black-10 dark:text-white-85 font-semibold">
            {currentStatus()}
          </p>
          <div
            className="flex flex-row -mt-3 bg-primary px-4 py-1 border border-solid border-primary rounded-full cursor-pointer"
            onClick={() => setAddContact(true)}
          >
            <ContactIcon fill="black" height="32px" width="35px" />
            <p className="mr-4 text-xl text-black-10">+</p>
            <button className="text-base text-black-10">
              Create new contact
            </button>
          </div>
        </div>
      </div>
      {!homeState.activeAccount.contacts ? (
        <div className="items-center justify-center mt-28 space-y-2">
          <div className="flex flex-row items-center justify-center">
            <ContactIcon fill="white" height="40px" width="40px" />
            <p className="text-center text-lg dark:text-white-75 text-black-10">
              + Build your contact list
            </p>
          </div>
          <p className="text-center text-base dark:text-white-55 text-black-10">
            Add friends and addresses you trust
          </p>
        </div>
      ) : (
        <div className="flex flex-col mt-2 space-5">
          {Object.keys(groupedContacts)
            .sort()
            .map((firstLetter) => (
              <div key={firstLetter}>
                <div className="h-[0.2px] w-full bg-white-15"></div>
                <p className="mt-1.5 font-extrabold text-primary text-xl">
                  {firstLetter}
                </p>
                {groupedContacts[firstLetter]
                  .sort((a, b) => a.username.localeCompare(b.username))
                  .map((contact) => (
                    <div
                      className="flex flex-row h-14 w-full justify-between bg-transparent hover:bg-white-10 rounded-md cursor-pointer hide-delete-icon"
                      key={contact.username}
                    >
                      <div
                        className="flex flex-row gap-x-2"
                        onClick={() => (
                          setClickedContact(contact), setEditContact(true)
                        )}
                      >
                        <div className="flex mt-3 ml-4 items-center justify-center w-8 h-8">
                          <img
                            className="h-8 w-10 rounded-full bg-white"
                            src={getShape(contact.address)}
                          />
                        </div>
                        <div className="flex flex-col px-3 py-1">
                          <p className="text-base dark:text-white-75 text-black-10">
                            {contact.username}
                          </p>
                          <p className="text-sm dark:text-white-55 text-black-10">
                            {truncateWordAtIndex(contact.address, 5)}
                          </p>
                        </div>
                      </div>
                      <div
                        className="mt-5 mr-10 opacity-5"
                        onClick={() => (
                          setClickedContact(contact), setDeleteContact(true)
                        )}
                      >
                        <Delete color="red" />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
      {addContact && <CreateNewContact showPopups={setAddContact} />}
      {editContact && (
        <EditCreatedContact
          details={clickedContact}
          showPopups={setEditContact}
        />
      )}
      {deleteContact && (
        <DeleteCreatedContact
          details={clickedContact}
          showPopups={setDeleteContact}
        />
      )}
    </div>
  );
};

export default ContactList;
