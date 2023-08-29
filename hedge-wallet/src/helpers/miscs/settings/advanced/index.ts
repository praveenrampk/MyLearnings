import { ContentsInAdvanced } from '@src/interfaces-and-types/pages/settings';

export const contentsInAdvanced: ContentsInAdvanced[] = [
  {
    heading: 'State logs',
    subHeading:
      'Your public account addresses and sent transactions are listed instate logs.',
    button: {
      text: 'Download state logs',
      btnColor: 'primary',
    },
  },
  {
    heading: 'Clear activity and nonce data',
    subHeading:
      "This clears the information in your wallet's activity page and resets the account's nonce. The only affected account and network are the present ones. Nothing will alter your funds or incoming transactions.",
    button: {
      text: 'Clear activity tab data',
      btnColor: 'red',
    },
  },
  {
    heading: 'Show hex data',
    subHeading: "Choose this to make the send screen's hex data field visible.",
    toggleSwitch: false,
  },
  {
    heading: 'Show conversion on test networks',
    subHeading: 'To display Fiat conversion on test networks, choose this.',
    toggleSwitch: false,
  },
  {
    heading: 'Show test networks',
    subHeading: 'To display test networks in the network list, choose this.',
    toggleSwitch: false,
  },
  // {
  //   heading: 'Customize transaction nonce',
  //   subHeading:
  //     'To alter the nonce (transaction number) displayed on confirmation screens, turn this on. Use this advanced function with caution.',
  //   toggleSwitch: false,
  // },
  {
    heading: 'Back-up your data',
    subHeading:
      'User settings, including preferences and account information, can be saved as a JSON file for backup.',
    button: {
      text: 'Backup',
      btnColor: 'primary',
    },
  },
  // {
  //   heading: 'Neglect the covert recovery backup reminder phrase',
  //   subHeading:
  //     'Activate this to turn off the prompt reminding you to backup your Secret Recovery Phrase. To prevent financial loss, we strongly advise backing up your Secret Recovery Phrase.',
  //   toggleSwitch: false,
  // },
];
