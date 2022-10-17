import aws from "aws-sdk";

aws.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_BS!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_BS!,
  },
  region: "us-east-2",
});

export default aws;
