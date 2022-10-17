import clsx from "clsx";
import { useState } from "react";

import { Typography } from "ui/typography/Typography";
import { Icon } from "ui/icon/Icon";

import { ItemProps } from "./Item.types";
import styles from "./Item.module.scss";

export const Item: React.FC<ItemProps> = ({ className, title, description }) => {
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={clsx(styles.item, className)}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div className={styles.item__title} onClick={onClick} role="button" tabIndex={0}>
        <Typography.TextLead flat>{title}</Typography.TextLead>
        <Icon name="icon-chevron-down" />
      </div>
      <div
        className={clsx(styles.item__description, {
          [styles["item__description--active"]]: isActive,
        })}
      >
        <Typography.Text flat>{description}</Typography.Text>
      </div>
    </div>
  );
};
