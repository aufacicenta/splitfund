import { PropertyCard } from "api/codegen";

import { Answer, TypeformResponse } from "./typeform.types";

const getTextTypeAnswerFieldValue = (answers: Answer[], ref: string) =>
  answers.filter((answer) => answer.field.ref === ref && answer.text)[0].text || "";
const getWebsiteTypeAnswerFieldValue = (answers: Answer[], ref: string) =>
  answers.filter((answer) => answer.field.ref === ref && answer.url)[0].url || "";
const getNumberTypeAnswerFieldValue = (answers: Answer[], ref: string) =>
  answers.filter((answer) => answer.field.ref === ref && answer.number)[0].number || 0;
const getImageTypeAnswerFieldValue = (answers: Answer[], ref: string) =>
  answers.filter((answer) => answer.field.ref === ref && answer.file_url)[0].file_url || "";
const getDateTypeAnswerFieldValue = (answers: Answer[], ref: string) =>
  answers.filter((answer) => answer.field.ref === ref && answer.date)[0].date || "";
const getChoiceTypeAnswerFieldValue = (answers: Answer[], ref: string) =>
  answers.filter((answer) => answer.field.ref === ref && answer.choice?.label)[0]?.choice?.label || "";

const parseAnswerFromResponseData = (data: TypeformResponse): PropertyCard | null => {
  const { answers } = data.items[0];

  if (!answers.length) {
    return null;
  }

  return {
    title: getTextTypeAnswerFieldValue(answers, "asset_title"),
    price: getNumberTypeAnswerFieldValue(answers, "asset_price"),
    shortDescription: getTextTypeAnswerFieldValue(answers, "asset_short_description"),
    longDescription: getTextTypeAnswerFieldValue(answers, "asset_long_description"),
    category: getChoiceTypeAnswerFieldValue(answers, "asset_category"),
    expirationDate: getDateTypeAnswerFieldValue(answers, "asset_campaign_expiration_date"),
    media: {
      featuredImageUrl: getImageTypeAnswerFieldValue(answers, "asset_featured_image"),
    },
    owner: {
      name: getTextTypeAnswerFieldValue(answers, "asset_owner"),
      url: getWebsiteTypeAnswerFieldValue(answers, "asset_owner_url"),
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

    const data: TypeformResponse = await response.json();

    if (!data?.items && !data.items.length) {
      return null;
    }

    return parseAnswerFromResponseData(data);
  } catch {
    //   @TODO log error
    return null;
  }
};
