import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouteError } from "react-router-dom";

export const Catch = () => {
  const error = useRouteError();

  if (!error) return;

  const isError = error instanceof Error;

  if (!isError) return;

  return (
    <div className="container h-screen">
      <div className="grid h-full place-items-center">
        <Card className="max-w-xl">
          <CardHeader>
            <h1 className="text-4xl font-bold">{error.message}</h1>
          </CardHeader>
          <CardBody>
            <p>{error.stack}</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export const Pending = () => <div>Loading from _app...</div>;
