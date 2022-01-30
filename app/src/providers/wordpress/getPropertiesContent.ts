import { Property } from "api/codegen";
import WPAPI from "wpapi";

export const getPropertiesContent = async (): Promise<Array<Property>> => {
  const wp = new WPAPI({ endpoint: "https://cms.bancosatoshi.com/wp-json" });

  const pages = await wp.pages().param("embed");

  if (!pages.length) {
    return [];
  }

  const propertiesContent = pages.map((page: any) => {
    const media = wp.media().id(page.featured_media);

    return {
      content: {
        title: page.title.rendered,
        asHtmlString: page.content.rendered,
        media: {
          featuredImageUrl: media?.media_details?.sizes?.large?.source_url || "",
        },
        customFields: {
          shortDescription: page?.custom_fields?.short_description,
          category: page?.custom_fields?.category,
          countryCode: page?.custom_fields?.country_code,
          latitude: page?.custom_fields?.latitude,
          longitude: page?.custom_fields?.longitude,
          nearConditionalEscrowContractAddress: page?.custom_fields?.near_conditional_escrow_contract_address,
        },
      },
    };
  });

  return propertiesContent;
};
