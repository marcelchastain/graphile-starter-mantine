import { Anchor, AnchorProps } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";

// TODO mc-2022-02-13 resolve conflict with react-router's Link
export function Link(props: Omit<AnchorProps<any>, "defaultProps">) {
  const { pathname } = useLocation();

  const { href, ...rest } = props;
  const className = [props.className, pathname === href && "is-active"]
    .filter(Boolean)
    .join(" ");
  return <Anchor href={href} {...rest} className={className} />;
}
