import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

export const Center = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className="container h-screen">
      <div className="grid h-full place-items-center">
        <Card className="w-full max-w-lg">
          {title && <CardHeader>{title}</CardHeader>}
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    </div>
  );
};
