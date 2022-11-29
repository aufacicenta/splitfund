import clsx from "clsx";

import { FAQsProps } from "./FAQs.types";
import styles from "./FAQs.module.scss";
import { Item } from "./item/Item";

export const FAQs: React.FC<FAQsProps> = ({ className }) => (
  <div className={clsx(styles.faqs, className)}>
    <Item title="How is my USDT/NEAR transfer protected?" description="Description" />
    <Item title="Can I opt out of an investment? eg. sell my shares" description="Description" />
    <Item title="What do I get as a guarantee for my investment?" description="Description" />
    <Item title="What is the average return on investment?" description="Description" />
    <Item title="Who's is behind the platform?" description="Description" />
    <Item title="Are there inherent costs for investing?" description="Description" />
    <Item title="Why the NEAR Protocol?" description="Description" />
  </div>
);
