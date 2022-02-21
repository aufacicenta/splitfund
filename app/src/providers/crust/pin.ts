import CrustPinner from "@crustio/crust-pin";

const crust = new CrustPinner(`${process.env.CRUST_ACCOUNT_SEEDS}`);

export default async (ipfsHash: string) => {
  await crust.pin(ipfsHash);
};
