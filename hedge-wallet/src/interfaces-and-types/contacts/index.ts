import { Dispatch, SetStateAction } from 'react';

import { ClearTransactionHistoryProps } from '../advanced';
import { Account, ContactDetails } from '../home-state';

export type CreateContactProps = ClearTransactionHistoryProps;

export interface EditContactProps {
  details: ContactDetails;
  showPopups: Dispatch<SetStateAction<boolean>>;
}

export type DeleteContactProps = EditContactProps;

export interface ReturnTypeForAddContacts {
  accounts: Account[];
  account: Account;
}
