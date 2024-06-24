import React from "react";

export const Section = ({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: string;
}) => {
  return (
    <>
      <section
        className="container flex flex-col items-center justify-center"
        style={{
          minHeight: height || "100vh",
        }}
      >
        {children}
      </section>
    </>
  );
};
