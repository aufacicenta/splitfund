import { BusinessCampaignContentFragment } from "api/codegen";
import WPAPI from "wpapi";

export const getPageContentByBusinessCampaignSlug = async (slug: string): Promise<BusinessCampaignContentFragment> => {
  const wp = new WPAPI({ endpoint: "https://cms.bancosatoshi.com/wp-json" });

  const pages = await wp.pages().param("embed").slug(slug);

  if (!pages.length) {
    // @TODO do something with an empty page content
    throw new Error("getPageContentByBusinessCampaignSlug: empty CMS pages");
  }

  const [page] = pages;

  const media = await wp.media().id(page.featured_media);

  return {
    asHtmlString: page.content.rendered,
    title: page.title.rendered,
    description: page?.custom_fields?.description,
    category: page?.custom_fields?.category,
    country: page?.custom_fields?.country,
    latitude: page?.custom_fields?.latitude,
    longitude: page?.custom_fields?.longitude,
    instagram: page?.custom_fields?.instagram,
    website: page?.custom_fields?.website,
    media: {
      featuredImageUrl: media?.media_details?.sizes?.large?.source_url,
    },
  };
};
