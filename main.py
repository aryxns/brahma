# main.py

from fastapi import FastAPI
import json
import requests
from web3 import Web3
import random
from ast import literal_eval
from pydantic import BaseModel
ETHERSCAN_API_KEYS = [
    "JWB6Z8YDYCWDS4HG2JA5JDBSGIQC2EWFIM",
    "21JE5I6E1NW533ATS1UZ2RZK3A8QXN37YG",
]


def get_etherscan_key():
    return random.choice(ETHERSCAN_API_KEYS)


class Item(BaseModel):
    address: str
    input: str
    abi: str


web3 = Web3(Web3.HTTPProvider(
    "https://eth-mainnet.alchemyapi.io/v2/8LiA7M2cWDG6azlTapCSdAfgow82wwrb"))
app = FastAPI()


@app.post("/getMethod")
async def getMethod(item: Item):
    contract = web3.eth.contract(
        address=web3.toChecksumAddress(item.address),  abi=item.abi)
    func_obj, func_params = contract.decode_function_input(item.input)
    return func_obj.fn_name
