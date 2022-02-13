import React from "react";
import { SharedLayout } from "@app/client/src/components";
import { useSharedQuery } from "@app/graphql/index";

const About: React.FC = () => {
  const query = useSharedQuery();
  return (
    <SharedLayout query={query} title={"About"}>
      About
    </SharedLayout>
  );
};

export default About;
