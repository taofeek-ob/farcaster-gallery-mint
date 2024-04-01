/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from "frog";
import { handle } from "frog/vercel";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { getNftMetadata } from "@/app/lib/getNftMetadata";
import { abi } from "@/app/lib/abi";



const app = new Frog({
  basePath: "/api",
  // Supply a Hub API URL to enable frame verification.
  // hubApiUrl: "https://api.hub.wevm.dev",
});

const ShapesContractAddress = "0x488A5c5f0aA5f44C8438A79E17867b5d30C418b3";
let maxSupply = 5;

// Frame to display user's response.
app.frame("/", (c) => {
  return c.res({
    image: "https://i.ibb.co/SmM9m2F/New.png",
    imageOptions: { width: 600, height: 600 },
    intents: [
      <Button action="/view" value="1">
        View Collection
      </Button>,
    ],
  });
});

app.frame("/view", async (c) => {
 
  const randomTokenId = Math.floor(Math.random() * maxSupply) + 1;
  const nftMetadata = await getNftMetadata(ShapesContractAddress, randomTokenId);
  maxSupply = nftMetadata.contract.totalSupply;
  const nftImageUrl = nftMetadata?.image?.cachedUrl;

  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <img
          src={nftImageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "rotate(90deg)",
          }}
        />
      </div>
    ),
    imageOptions: { width: 600, height: 600 },
    intents: [
      <Button value="1">More</Button>,
      <Button.Transaction action="/finish" target="/mint">
        Mint
      </Button.Transaction>,
    ],
  });
});

app.transaction("/mint", (c) => {
  // Contract transaction response.

  return c.contract({
    abi,
    chainId: "eip155:8453",
    functionName: "mint",
    to: "0x488A5c5f0aA5f44C8438A79E17867b5d30C418b3",
  });
});

app.frame("/finish", (c) => {
  const { transactionId } = c;
  return c.res({
    image: "https://i.ibb.co/sP5phSQ/success.png",
    imageOptions: { width: 600, height: 600 },

    intents: [
      <Button action="/view" value="1">
        View Collection
      </Button>,
      ,
      <Button.Link href={`https://basescan.org/tx/${transactionId}`}>BaseScan</Button.Link>,
      <Button.Link href="https://opensea.io/collection/shapes-45">OpenSea</Button.Link>,
      ,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
