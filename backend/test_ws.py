import asyncio
import websockets


async def test():

    uri = "ws://127.0.0.1:8000/ws"

    async with websockets.connect(uri) as websocket:

        while True:

            data = await websocket.recv()

            print(data)


asyncio.run(test())