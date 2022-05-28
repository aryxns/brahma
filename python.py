# main.py

from fastapi import FastAPI
import json
import requests
from web3 import Web3

web3 = Web3(Web3.HTTPProvider(
    "https://eth-mainnet.alchemyapi.io/v2/8LiA7M2cWDG6azlTapCSdAfgow82wwrb"))
app = FastAPI()


@app.get("/v3new")
async def v3new(input: str):
    with open("v3.json") as f:
        abi = json.loads(f.read())['result']
        contract = web3.eth.contract(
            address="0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", abi=abi)
        func_obj, func_params = contract.decode_function_input(input)
        return func_params
