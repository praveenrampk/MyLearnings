import React, { useState } from "react";
import { copy } from "../../utils/helpers";

const Copy = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onClickCopy = () => {
    copy(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <span
      className={`ml-1 icon mr-0 ${isCopied ? "icon-check iconXS-18" : "icon-copy iconXS-14 dark-mode-img"
        } `}
      onClick={onClickCopy}
    />
  );
};

export default Copy;
