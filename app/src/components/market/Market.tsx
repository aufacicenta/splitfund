/* eslint-disable no-irregular-whitespace */
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { Badge, Navbar } from "flowbite-react";

import { SplitfundIcon } from "ui/icons/SplitfundIcon";
import { MediaCarousel } from "ui/media-carousel/MediaCarousel";
import ipfs from "providers/ipfs";
import { Typography } from "ui/typography/Typography";
import { RefSwapWidgetProps } from "ui/splitfund/ref-swap-widget/RefSwapWidget.types";

import { MarketProps } from "./Market.types";
import styles from "./Market.module.scss";

function LinkRenderer(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const RefSwapWidget = dynamic<RefSwapWidgetProps>(
  () => import("ui/splitfund/ref-swap-widget/RefSwapWidget").then((mod) => mod.RefSwapWidget),
  { ssr: false },
);

export const Market: React.FC<MarketProps> = ({ className, property }) => (
  <div className={clsx(styles.market, className, "bg-primary", "h-screen", "p-default")}>
    <div className={clsx(styles.market__container, "bg-secondary-800", "rounded", "border-2", "border-secondary-700")}>
      <Navbar fluid rounded className={clsx("dark:bg-secondary-800")}>
        <Navbar.Brand href="#">
          <SplitfundIcon className={clsx(styles["market__navbar--logo"], "fill-primary", "stroke-primary")} />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/navbars">Sell With Us</Navbar.Link>
          <Navbar.Link href="/navbars">About</Navbar.Link>
          <Navbar.Link href="/navbars">Learn</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <section className="p-default">
        <div className={clsx(styles.market__row)}>
          <div
            className={clsx(
              styles.market__details,
              "bg-secondary-900",
              "border-secondary-800",
              "border",
              "rounded-tl",
              "p-default",
            )}
          >
            <div className="mb-default">
              <Typography.Headline1>SFP1/USDT</Typography.Headline1>
              <div className="flex">
                <span className="text-gray-500 text-xs">Real Estate — &nbsp;</span>
                <Badge className="inline-block dark:bg-primary dark:text-secondary">funding</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className={clsx(styles["market__details--about"], "overflow-y-scroll")}>
                <MediaCarousel media={property.gallery.map((item) => ({ url: ipfs.asHttpsURL(item.url) }))} />
                <Typography.Headline2 className="text-white text-medium text-lg">About</Typography.Headline2>
                <div className={clsx(styles["market__details--long-description"])}>
                  <ReactMarkdown components={{ a: LinkRenderer }}>{property.longDescription}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              styles.market__orders,
              "bg-secondary-900",
              "border-secondary-800",
              "border",
              "rounded-tr",
              "p-default",
            )}
          >
            <Typography.Headline2>Buy or Sell</Typography.Headline2>

            <RefSwapWidget property={property} />
          </div>
        </div>
        <div className={clsx(styles.market__row)}>
          <div
            className={clsx(
              styles.market__table,
              "bg-secondary-900",
              "border-secondary-800",
              "border",
              "rounded-b",
              "p-default",
            )}
          >
            <Typography.Headline2>Properties</Typography.Headline2>
            <div className={clsx(styles["market__table--wrapper"], "overflow-x-auto relative block")}>
              <table className="w-full">
                <thead
                  className={clsx(
                    styles["market__table--head"],
                    "sticky top-0 capitalize font-medium text-xs dark:bg-secondary text-gray-500",
                  )}
                >
                  <tr>
                    <th scope="col" className="text-left">
                      Token Name
                    </th>
                    <th scope="col" className="text-left">
                      Category
                    </th>
                    <th scope="col" className="text-right">
                      Sold %
                    </th>
                    <th scope="col" className="text-right">
                      Total Investment Value
                    </th>
                    <th scope="col" className="text-right">
                      Your Investment
                    </th>
                    <th scope="col" className="text-right">
                      Total Returns Estimate
                    </th>
                    <th scope="col" className="text-right">
                      Anual Gross Rents
                    </th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-right">
                      Days Left
                    </th>
                  </tr>
                </thead>
                <tbody className={clsx(styles["market__table--body"], "overflow-y-scroll text-xs")}>
                  <tr className="bg-white border-none dark:bg-secondary-900 text-white hover:cursor-pointer dark:hover:bg-gray-900">
                    <td className="font-bold text-gray-900 dark:text-white">SFP1/USDT</td>
                    <td>Real Estate</td>
                    <td className="text-right">25%</td>
                    <td className="text-right">USDT 123,000.00</td>
                    <td className="text-right">USDT 21,000.00 — 23%</td>
                    <td className="text-right">12.05%</td>
                    <td className="text-right">USDT 11,500.00</td>
                    <td>
                      <Badge className="dark:bg-primary dark:text-secondary justify-center">funding</Badge>
                    </td>
                    <td className="text-right">30</td>
                  </tr>
                  <tr className="bg-white border-none dark:bg-secondary text-white hover:cursor-pointer dark:hover:bg-gray-900">
                    <td className="font-bold text-gray-900 dark:text-white">SFP1/USDT</td>
                    <td>Real Estate</td>
                    <td className="text-right">25%</td>
                    <td className="text-right">USDT 123,000.00</td>
                    <td className="text-right">USDT 21,000.00 — 23%</td>
                    <td className="text-right">12.05%</td>
                    <td className="text-right">USDT 11,500.00</td>
                    <td>
                      <Badge className="dark:bg-primary dark:text-secondary justify-center">funding</Badge>
                    </td>
                    <td className="text-right">30</td>
                  </tr>
                  <tr className="bg-white border-none dark:bg-secondary-900 text-white">
                    <td className="font-bold text-gray-900 dark:text-white">SFP1/USDT</td>
                    <td>Real Estate</td>
                    <td className="text-right">25%</td>
                    <td className="text-right">USDT 123,000.00</td>
                    <td className="text-right">USDT 21,000.00 — 23%</td>
                    <td className="text-right">12.05%</td>
                    <td className="text-right">USDT 11,500.00</td>
                    <td>
                      <Badge className="dark:bg-primary dark:text-secondary justify-center">funding</Badge>
                    </td>
                    <td className="text-right">30</td>
                  </tr>
                  <tr className="bg-white border-none dark:bg-secondary-900 text-white">
                    <td className="font-bold text-gray-900 dark:text-white">SFP1/USDT</td>
                    <td>Real Estate</td>
                    <td className="text-right">25%</td>
                    <td className="text-right">USDT 123,000.00</td>
                    <td className="text-right">USDT 21,000.00 — 23%</td>
                    <td className="text-right">12.05%</td>
                    <td className="text-right">USDT 11,500.00</td>
                    <td>
                      <Badge className="dark:bg-primary dark:text-secondary justify-center">funding</Badge>
                    </td>
                    <td className="text-right">30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);
