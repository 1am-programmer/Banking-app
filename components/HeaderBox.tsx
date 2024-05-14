import React from "react";

/**
 * HeaderProps is already defined in our index.ts and all propers has been declared, expectin a string
 * This is one great feature of typescript
 */

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}

        {type === "greeting" && (
          <span className="text-bankGradient">
            &nbsp;
            {user}
          </span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
