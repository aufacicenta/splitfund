import ipfsClient from "ipfs-http-client";

export default ipfsClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
