import AWS from "./aws";

const region = "us-east-2";
const secretName =
  "arn:aws:secretsmanager:us-east-2:111975705704:secret:bancosatoshi_btcpay_storeid_to_webhook_key-G7FTqq";

export default async (storeId: string) => {
  const client = new AWS.SecretsManager({
    region,
  });

  const res = await client.getSecretValue({ SecretId: secretName }).promise();

  const secrets = JSON.parse(res.SecretString!);

  return secrets[storeId];
};
