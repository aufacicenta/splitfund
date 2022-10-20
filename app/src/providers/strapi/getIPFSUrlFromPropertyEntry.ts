import { Property } from "api/webhooks/splitfund/strapi-entry-update/types";

import ipfs from "providers/ipfs";

import { STRAPI_ADMIN_URL } from "./constants";

const getIPFSUrlFromPropertyEntry = async (propertyEntry: Property): Promise<string> => {
  try {
    const gallery = await Promise.all(
      propertyEntry.gallery.map(async (item) => ({
        url: await ipfs.getFileAsIPFSUrl(`${STRAPI_ADMIN_URL}${item.url}`),
        name: item.name,
        alternativeText: item.alternativeText,
        caption: item.caption,
        width: item.width,
        height: item.height,
        ext: item.ext,
        mime: item.mime,
      })),
    );

    const ownerGallery = await Promise.all(
      propertyEntry.owner.gallery.map(async (item) => ({
        url: await ipfs.getFileAsIPFSUrl(`${STRAPI_ADMIN_URL}${item.url}`),
        name: item.name,
        alternativeText: item.alternativeText,
        caption: item.caption,
        width: item.width,
        height: item.height,
        ext: item.ext,
        mime: item.mime,
      })),
    );

    const content: Property = {
      ...propertyEntry,
      owner: {
        ...propertyEntry.owner,
        gallery: ownerGallery,
      },
      gallery,
    };

    const fileName = `splitfund-${propertyEntry.id}.json`;
    const ipfsResponse = await ipfs.upload(Buffer.from(JSON.stringify(content)), fileName);

    return ipfsResponse?.path as string;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    throw new Error(`providers/strapi/getIPFSUrlFromPropertyEntry: failed to get IPFS URL from Property entry`);
  }
};

export default getIPFSUrlFromPropertyEntry;
