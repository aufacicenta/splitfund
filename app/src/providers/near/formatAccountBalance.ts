import * as nearAPI from "near-api-js";

export default (balance: string) => `${nearAPI.utils.format.formatNearAmount(balance, 2)} NEAR Ⓝ`;
