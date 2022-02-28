import { PropertyCard } from "api/codegen";

import crust from "providers/crust";
import currency from "providers/currency";
import formatFiatCurrency from "providers/currency/formatFiatCurrency";
import ipfs from "providers/ipfs";
import { ConditionalEscrow } from "providers/near/conditional-escrow";

import { Answer, TypeformResponse } from "./typeform.types";

const getTextTypeAnswerFieldValue = (answersRefKeyMap: Map<string, Answer>, ref: string) =>
  answersRefKeyMap.get(ref)?.text || "";

const getWebsiteTypeAnswerFieldValue = (answersRefKeyMap: Map<string, Answer>, ref: string) =>
  answersRefKeyMap.get(ref)?.url || "";

const getNumberTypeAnswerFieldValue = (answersRefKeyMap: Map<string, Answer>, ref: string) =>
  answersRefKeyMap.get(ref)?.number || 0;

const getImageTypeAnswerFieldValue = (answersRefKeyMap: Map<string, Answer>, ref: string) =>
  answersRefKeyMap.get(ref)?.file_url || "";

const getDateTypeAnswerFieldValue = (answersRefKeyMap: Map<string, Answer>, ref: string) =>
  answersRefKeyMap.get(ref)?.date || "";

const getChoiceTypeAnswerFieldValue = (answersRefKeyMap: Map<string, Answer>, ref: string) =>
  answersRefKeyMap.get(ref)?.choice?.label || "";

const getResponseFileAsIPFSUrl = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TYPEFORM_PAT}`,
      },
    });

    const blob = await response.arrayBuffer();
    const fileName = url.split("/").pop();

    const ipfsResponse = await ipfs.upload(Buffer.from(blob), fileName!);

    return ipfsResponse?.path || "";
  } catch {
    return "";
  }
};

const parseAnswerFromResponseData = async (
  data: TypeformResponse,
  responseId: string,
): Promise<PropertyCard | null> => {
  const { answers } = data.items[0];

  if (!answers.length) {
    return null;
  }

  const answersRefKeyMap = new Map<string, Answer>();

  answers.forEach((answer) => {
    answersRefKeyMap.set(answer.field.ref, answer);
  });

  const content = {
    title: getTextTypeAnswerFieldValue(answersRefKeyMap, "asset_title"),
    shortDescription: getTextTypeAnswerFieldValue(answersRefKeyMap, "asset_short_description"),
    longDescription: getTextTypeAnswerFieldValue(answersRefKeyMap, "asset_long_description"),
    category: getChoiceTypeAnswerFieldValue(answersRefKeyMap, "asset_category"),
    expirationDate: getDateTypeAnswerFieldValue(answersRefKeyMap, "asset_campaign_expiration_date"),
    media: {
      featuredImageUrl: await getResponseFileAsIPFSUrl(
        getImageTypeAnswerFieldValue(answersRefKeyMap, "asset_featured_image"),
      ),
    },
    owner: {
      name: getTextTypeAnswerFieldValue(answersRefKeyMap, "asset_owner"),
      url: getWebsiteTypeAnswerFieldValue(answersRefKeyMap, "asset_owner_url"),
    },
  };

  const fileName = `${responseId}.json`;
  const ipfsResponse = await ipfs.upload(Buffer.from(JSON.stringify(content)), fileName);

  try {
    await crust.pin(ipfsResponse?.path!);
  } catch {
    // @TODO log error. File was not pinned to Crust Network successfully
  }

  const priceFieldValue = getNumberTypeAnswerFieldValue(answersRefKeyMap, "asset_price");
  const { equivalence } = await ConditionalEscrow.getCurrentPriceEquivalence(priceFieldValue);
  const price = {
    value: priceFieldValue,
    fundedPercentage: "80",
    exchangeRate: {
      price: formatFiatCurrency(priceFieldValue),
      currencySymbol: currency.constants.DEFAULT_VS_CURRENCY,
      equivalence: formatFiatCurrency(equivalence),
    },
  };

  return {
    ...content,
    price,
    media: { ...content.media, ipfsURL: ipfsResponse?.path! },
  };
};

export default async (responseId: string): Promise<PropertyCard | null> => {
  try {
    const response = await fetch(
      `https://api.typeform.com/forms/miiVVTw3/responses?included_response_ids=${responseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TYPEFORM_PAT}`,
        },
      },
    );

    const data = (await response.json()) as TypeformResponse;

    if (!data?.items && !data.items.length) {
      throw new Error(`[getResponseById]: typeform data is empty for responseId=${responseId}`);
    }

    return await parseAnswerFromResponseData(data, responseId);
  } catch {
    //   @TODO log error
    return null;
  }
};
