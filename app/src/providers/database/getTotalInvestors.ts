import { BusinessFundingCampaignTransactionsModel } from "@bancosatoshi/database/business/model";
import { uniqBy } from "lodash";

export default (transactions: BusinessFundingCampaignTransactionsModel[]) =>
  uniqBy(transactions, (transaction) => transaction.getDataValue("user_id")).length;
