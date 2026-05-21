import time

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import psutil
import ollama
import asyncio

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "AI DevOps Monitor Running"
    }


@app.get("/metrics")
def metrics():

    return {
        "cpu": psutil.cpu_percent(),
        "memory": psutil.virtual_memory().percent
    }


@app.get("/analyze")
def analyze():

    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().percent

    prompt = f"""
    CPU usage is {cpu}%.
    Memory usage is {memory}%.
    
    Analyze system health.
    """

    response = ollama.chat(
        model="qwen2.5:1.5b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "analysis": response["message"]["content"]
    }



@app.get("/processes")
def get_processes():

    process_list = []

    for proc in psutil.process_iter(['pid', 'name', 'username', 'cpu_percent', 'memory_percent']):

        try:
            info = proc.info

            process_list.append({
                "pid": info["pid"],
                "name": info["name"],
                "username": info["username"],
                "cpu": info["cpu_percent"] or 0,
                "memory": info["memory_percent"] or 0
            })

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    process_list.sort(
        key=lambda x: (x["memory"], x["cpu"]),
        reverse=True
    )

    return {
        "count": len(process_list),
        "processes": process_list[:50]
    }




@app.get("/process-analysis")
def process_analysis():

    process_list = []

    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']):

        try:
            info = proc.info

            process_list.append({
                "name": info["name"],
                "cpu": info["cpu_percent"] or 0,
                "memory": info["memory_percent"] or 0
            })

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    process_list.sort(
        key=lambda x: (x["memory"], x["cpu"]),
        reverse=True
    )

    top = process_list[:10]

    prompt = f"""
    You are a system performance analyst.

    These are top resource-consuming processes:

    {top}

    Give:
    - performance issues
    - risky processes
    - optimization suggestions
    - what user should stop or keep
    """

    response = ollama.chat(
        model="qwen2.5:1.5b",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return {
        "top_processes": top,
        "analysis": response["message"]["content"]
    }



@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()

    while True:

        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent

        data = {
            "cpu": cpu,
            "memory": memory
        }

        await websocket.send_json(data)

        await asyncio.sleep(2)



@app.websocket("/ws/metrics")
async def metrics_ws(websocket: WebSocket):
    await websocket.accept()

    while True:
        cpu = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory().percent

        await websocket.send_json({
            "cpu": cpu,
            "memory": memory,
            "timestamp": time.time()
        })

        await asyncio.sleep(2)




@app.websocket("/ws/processes")
async def processes_ws(websocket: WebSocket):
    await websocket.accept()

    while True:
        process_list = []

        for p in psutil.process_iter(['name', 'cpu_percent', 'memory_percent']):
            try:
                info = p.info

                process_list.append({
                    "name": info["name"],
                    "cpu": info["cpu_percent"] or 0,
                    "memory": info["memory_percent"] or 0
                })

            except:
                continue

        process_list.sort(key=lambda x: (x["memory"], x["cpu"]), reverse=True)

        await websocket.send_json({
            "processes": process_list[:10],
            "timestamp": time.time()
        })

        await asyncio.sleep(2)



@app.websocket("/ws/ai")
async def ai_ws(websocket: WebSocket):
    await websocket.accept()

    history = []

    while True:

        cpu = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory().percent

        history.append({"cpu": cpu, "memory": memory})

        if len(history) > 5:
            history.pop(0)

        avg_cpu = sum(x["cpu"] for x in history) / len(history)
        avg_memory = sum(x["memory"] for x in history) / len(history)

        processes = []

        for p in psutil.process_iter(['name', 'cpu_percent', 'memory_percent']):
            try:
                info = p.info

                processes.append({
                    "name": info["name"],
                    "cpu": info["cpu_percent"] or 0,
                    "memory": info["memory_percent"] or 0
                })

            except:
                continue

        processes.sort(
            key=lambda x: x["cpu"] * 0.6 + x["memory"] * 0.4,
            reverse=True
        )

        processes = processes[:5]

        prompt = f"""
System health (averaged):

CPU: {avg_cpu:.2f}
Memory: {avg_memory:.2f}

Top processes (weighted by CPU + Memory):
{[
    f"{p['name']} | CPU {p['cpu']} | MEM {p['memory']}"
    for p in processes
]}

Return:
- short summary
- risk level (low/medium/high)
- top cause
- one fix
"""

        response = ollama.chat(
            model="qwen2.5:1.5b",
            messages=[{"role": "user", "content": prompt}]
        )

        await websocket.send_json({
            "analysis": response["message"]["content"],
            "cpu": avg_cpu,
            "memory": avg_memory,
            "timestamp": time.time()
        })

        await asyncio.sleep(15)