const axios = require("axios");

async function getNFTs(address) {
  console.log(address);
  try {
    const { data: x } = await axios.get(
      `https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`,
      {
        headers: {
          "X-API-Key":
            "MGOkF9jd5yDR1jLRVPq1EmDWA5SmqzTUKCwiDq0fOuRWs5i0sMZtQtx2jhJyJRNG",
        },
      }
    );
    const data = x.result;
    

    let NFTs_held = 0;
    let bluechip_held = 0;

    data.forEach((_NFT) => {
      if (
        _NFT == "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" ||
        _NFT == "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"
      ) {
        bluechip_held++;
      }

      NFTs_held++;
    });

    return {
      number_of_NFTs: NFTs_held,
      number_of_bluechip: bluechip_held,
    };
  } catch (error) {
    console.log(error);
    return {
      number_of_NFTs: 0,
      number_of_bluechip: 0,
    };
  }
}

module.exports = getNFTs;
