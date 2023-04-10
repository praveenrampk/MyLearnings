import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

function Popovers({ title, message = "", placement = "right" }) {
  const popover = (
    <Popover id="popover">
      {title && (
        <Popover.Title data-testid="popover-title" id="popover-title" as="h3">
          {title}
        </Popover.Title>
      )}
      <Popover.Content data-testid="popover-content" id="popover-content">
        {message}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement={placement}
      overlay={popover}
    >
      <div id="infoIcon" className={`icon ml-2 infoIcon iconXS-18`} />
    </OverlayTrigger>
  );
}

export default Popovers;
