export interface ContentsInAdvanced {
  heading: string;
  subHeading: string;
  button?: {
    text: string;
    btnColor: string;
  };
  toggleSwitch?: boolean;
}

export interface ContentsInGeneral {
  heading: string;
  subHeading: string;
  radio?: {
    primary: boolean;
    fiat: boolean;
  };
  dropdown?: string[];
}

export interface SecurityContent {
  heading: string;
  button?: {
    btnText: string;
    btnColor: string;
  };
  changePassword?: string;
}

export interface PrivacyContent {
  heading1: string;
  heading2: string;
  subHeading: string;
  toggle?: boolean;
  buttonText?: string;
  lockWallet?: number;
}

export interface SecurityPrivacyContents {
  security: SecurityContent[];
  privacy: PrivacyContent[];
}
