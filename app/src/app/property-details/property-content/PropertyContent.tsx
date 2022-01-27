import clsx from "clsx";
import Head from "next/head";

import { PropertyContentProps } from "./PropertyContent.types";
import styles from "./PropertyContent.module.scss";

export const PropertyContent: React.FC<PropertyContentProps> = ({ content, className }) => {
  if (!content) {
    return <div>loading</div>;
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cms.bancosatoshi.com/wp-includes/css/dist/block-library/style.min.css?ver=5.8.2"
          media="screen"
        />
        <script
          src="https://cms.bancosatoshi.com/wp-content/plugins/jetpack/_inc/blocks/map/view.js?minify=false&ver=10.5.1"
          defer
        />
        <style id="uagb-style-conditional-extension">{`@media (min-width: 1025px){body .uag-hide-desktop.uagb-google-map__wrap,body .uag-hide-desktop{display:none}}@media (min-width: 768px) and (max-width: 1024px){body .uag-hide-tab.uagb-google-map__wrap,body .uag-hide-tab{display:none}}@media (max-width: 767px){body .uag-hide-mob.uagb-google-map__wrap,body .uag-hide-mob{display:none}}</style><style id="uagb-style-frontend-53">.wp-block-uagb-table-of-contents .uagb-toc__wrap{display:inline-block}.wp-block-uagb-table-of-contents ul.uagb-toc__list,.wp-block-uagb-table-of-contents ol.uagb-toc__list{margin-left:2.2em;padding-left:0px;margin-bottom:0}.wp-block-uagb-table-of-contents ul.uagb-toc__list li,.wp-block-uagb-table-of-contents ol.uagb-toc__list li{margin:0}.wp-block-uagb-table-of-contents.uagb-toc__align-left{text-align:left}.wp-block-uagb-table-of-contents.uagb-toc__align-center{text-align:center}.wp-block-uagb-table-of-contents.uagb-toc__align-right{text-align:right}.wp-block-uagb-table-of-contents ul li:empty{display:none}.wp-block-uagb-table-of-contents .uagb-toc__title-wrap{display:flex;align-items:center}.wp-block-uagb-table-of-contents .uagb-toc__is-collapsible.uagb-toc__title-wrap{cursor:pointer}.wp-block-uagb-table-of-contents .uag-toc__collapsible-wrap svg{width:20px;height:20px}.wp-block-uagb-table-of-contents .uag-toc__collapsible-wrap{margin-left:10px;display:flex;cursor:pointer}.wp-block-uagb-table-of-contents.uagb-toc__collapse .uagb-toc__list-wrap{display:none}ol.uagb-toc__list li.uagb-toc__list ul,ol.uagb-toc__list ul.uagb-toc__list ul{list-style-type:circle}ol.uagb-toc__list>ul,ol.uagb-toc__list>li{list-style-type:disc}.uagb-toc__scroll-top{display:none;position:fixed;bottom:50px;right:50px;padding:10px;background:#ccd0d4;cursor:pointer;font-size:1rem;line-height:1.85714285714286}.uagb-toc__scroll-top svg{margin-left:0px;transform:translate(0, -20%) rotate(180deg);width:1.6em;height:.6em;fill:currentColor}.uagb-toc__scroll-top.uagb-toc__show-scroll{display:inline-table} .uagb-block-66afa4c3 .uagb-toc__list-wrap li a{color: #333;}.uagb-block-66afa4c3 .uagb-toc__title-wrap{justify-content: flex-start;}.uagb-block-66afa4c3 .uagb-toc__title{font-weight: 500;font-size: 20px;}.uagb-block-66afa4c3 .uagb-toc__wrap{border-style: solid;border-width: 1px;border-color: #333;padding-left: 30px;padding-right: 30px;padding-top: 30px;padding-bottom: 30px;background: #eee;}.uagb-block-66afa4c3 .uagb-toc__list-wrap{column-count: 1;overflow: hidden;}.uagb-block-66afa4c3 .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child{padding-top: 0;}.uagb-block-66afa4c3 .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child{padding-bottom: 0;}@media only screen and (max-width: 976px) {.uagb-block-66afa4c3 .uagb-toc__list-wrap{column-count: 1;overflow: hidden;}.uagb-block-66afa4c3 .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child{padding-top: 0;}.uagb-block-66afa4c3 .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child{padding-bottom: 0;}}@media only screen and (max-width: 767px) {.uagb-block-66afa4c3 .uagb-toc__list-wrap{column-count: 1;overflow: hidden;}.uagb-block-66afa4c3 .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child{padding-top: 0;}.uagb-block-66afa4c3 .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child{padding-bottom: 0;}}`}</style>
        <style>
          {`
            .wp-block-image.alignfull img,
            .wp-block-image.alignwide img {
              height: auto;
            }
          `}
        </style>
      </Head>

      <section
        id="property-content"
        className={clsx(styles["property-content"], className, "entry-content")}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: content.asHtmlString }}
      />
    </>
  );
};
