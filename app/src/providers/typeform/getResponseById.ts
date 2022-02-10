import { PropertyCard } from "api/codegen";

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

const getResponseFileAsBase64String = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TYPEFORM_PAT}`,
      },
    });

    const blob = await response.arrayBuffer();

    return `data:${response.headers.get("content-type")};base64,${Buffer.from(blob).toString("base64")}`;
  } catch {
    return "";
  }
};

const parseAnswerFromResponseData = async (data: TypeformResponse): Promise<PropertyCard | null> => {
  const { answers } = data.items[0];

  if (!answers.length) {
    return null;
  }

  const answersRefKeyMap = new Map<string, Answer>();

  answers.forEach((answer) => {
    answersRefKeyMap.set(answer.field.ref, answer);
  });

  return {
    title: getTextTypeAnswerFieldValue(answersRefKeyMap, "asset_title"),
    price: getNumberTypeAnswerFieldValue(answersRefKeyMap, "asset_price"),
    shortDescription: getTextTypeAnswerFieldValue(answersRefKeyMap, "asset_short_description"),
    longDescription: getTextTypeAnswerFieldValue(answersRefKeyMap, "asset_long_description"),
    category: getChoiceTypeAnswerFieldValue(answersRefKeyMap, "asset_category"),
    expirationDate: getDateTypeAnswerFieldValue(answersRefKeyMap, "asset_campaign_expiration_date"),
    media: {
      featuredImageUrl: await getResponseFileAsBase64String(
        getImageTypeAnswerFieldValue(answersRefKeyMap, "asset_featured_image"),
      ),
    },
    owner: {
      name: getTextTypeAnswerFieldValue(answersRefKeyMap, "asset_owner"),
      url: getWebsiteTypeAnswerFieldValue(answersRefKeyMap, "asset_owner_url"),
    },
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
      return null;
    }

    return await parseAnswerFromResponseData(data);
  } catch {
    //   @TODO log error
    return null;
  }
};
