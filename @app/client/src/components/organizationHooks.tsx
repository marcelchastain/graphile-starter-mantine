import { QueryResult } from "@apollo/client";
import type { OrganizationPage_QueryFragment } from "@app/graphql";
import { Box, Group } from "@mantine/core";
import React from "react";

import { ErrorAlert, FourOhFour } from "./";
import { SpinPadded } from "./SpinPadded";
import { useParams } from "react-router-dom";

export function useOrganizationSlug() {
  const { slug: rawSlug } = useParams();
  return String(rawSlug);
}

export function useOrganizationLoading(
  query: Pick<
    QueryResult<OrganizationPage_QueryFragment>,
    "data" | "loading" | "error" | "networkStatus" | "client" | "refetch"
  >
) {
  const { data, loading, error } = query;

  let child: JSX.Element | null = null;
  const organization = data?.organizationBySlug;
  if (organization) {
    //child = <OrganizationPageInner organization={organization} />;
  } else if (loading) {
    child = <SpinPadded />;
  } else if (error) {
    child = <ErrorAlert error={error} />;
  } else {
    child = <FourOhFour currentUser={data?.currentUser} />;
  }

  return child ? (
    <Group>
      <Box style={{ flex: 1 }}>{child}</Box>
    </Group>
  ) : null;
}
