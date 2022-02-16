import { AddOptions } from "ipfs-http-client/src/pin/remote";
import path from "path";
import CID from "cids/dist/src/index";

import client from "./client";
import { ContentOptions, IpfsResponse } from "./ipfs.types";

function ensureIpfsUriPrefix(cidOrURI: CID) {
  let uri = cidOrURI.toString();

  if (!uri.startsWith("ipfs://")) {
    uri = `ipfs://${cidOrURI}`;
  }

  // Avoid the Nyan Cat bug (https://github.com/ipfs/go-ipfs/pull/7930)
  if (uri.startsWith("ipfs://ipfs/")) {
    uri = uri.replace("ipfs://ipfs/", "ipfs://");
  }

  return uri;
}

const getFileBasename = (options: ContentOptions) => {
  const filePath = options.path || "asset.bin";
  const basename = path.basename(filePath);

  return basename;
};

async function addFileToIPFS(
  content: Uint8Array,
  options: ContentOptions,
  ipfsOptions?: AddOptions,
): Promise<IpfsResponse> {
  const basename = getFileBasename(options);

  const ipfsPath = `/near-holdings/${basename}`;

  const result = await client.add({ path: ipfsPath, content }, { hashAlg: "sha2-256", ...ipfsOptions });

  return {
    ...result,
    path: `${result.cid.toString()}/${basename}`,
    uri: `${ensureIpfsUriPrefix(result.cid)}/${basename}`,
  };
}

export default async (content: Buffer, name: string): Promise<IpfsResponse | null> => {
  try {
    const result = await addFileToIPFS(content, { path: name });

    return {
      ...result,
      name,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
};
