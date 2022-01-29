import { PropertyContentFragment } from "api/codegen";
import WPAPI from "wpapi";

export const getPageContentByPropertySlug = async (slug: string): Promise<PropertyContentFragment> => {
  const wp = new WPAPI({ endpoint: "https://cms.bancosatoshi.com/wp-json" });

  const pages = await wp.pages().param("embed").slug(slug);

  if (!pages.length) {
    // @TODO do something with an empty page content
    throw new Error("getPageContentByPropertySlug: empty CMS pages");
  }

  const [page] = pages;

  const media = await wp.media().id(page.featured_media);

  return {
    asHtmlString: page.content.rendered,
    title: page.title.rendered,
    media: {
      featuredImageUrl: media?.media_details?.sizes?.large?.source_url,
    },
    customFields: {
      shortDescription: page?.custom_fields?.short_description,
      category: page?.custom_fields?.category,
      countryCode: page?.custom_fields?.country_code,
      latitude: page?.custom_fields?.latitude,
      longitude: page?.custom_fields?.longitude,
      nearConditionalEscrowContractAddress: page?.custom_fields?.near_conditional_escrow_contract_address,
    },
  };
};
