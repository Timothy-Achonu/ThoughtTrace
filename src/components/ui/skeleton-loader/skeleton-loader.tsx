import clsx from "clsx";
import React from "react";

import styles from "./skeleton-loader.module.scss";
import { SkeletonLoaderProps } from "./skeleton-loader.types";

const filterProps = (
  tag: keyof JSX.IntrinsicElements,
  props: SkeletonLoaderProps
) => {
  if (tag === "details") {
    return props;
  }

  // Destructure to remove onToggle if tag is not details
  const { ...rest } = props;
  return rest;
};

// SkeletonLoader component
const SkeletonLoader: React.FC<SkeletonLoaderProps> = (props) => {
  const {
    variant = "rounded",
    tag,
    customClassName = "",
    children,
    width = "auto",
    height = "1.2rem",
    ...rest
  } = props;

  // Resolved tag
  const Tag = (tag || "span") as keyof JSX.IntrinsicElements;

  // Filtered props
  const filteredProps = filterProps(Tag, rest);

  return (
    <Tag
      style={{ width, height }}
      className={clsx(
        customClassName,
        styles["skeleton-root"],
        styles[`skeleton-variant-${variant}`]
      )}
      {...filteredProps}
    >
      {children}
    </Tag>
  );
};

export { SkeletonLoader };
