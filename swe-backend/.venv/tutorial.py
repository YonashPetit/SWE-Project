from enum import Enum
from fastapi import FastAPI
from pydantic import BaseModel

fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenel"

app = FastAPI()

#needy is required, skip defults to 0, limit is optional int
@app.get("/items/{item_id}")
async def many_query_options_example(item_id: str, needy: str, skip: int = 0, limit: int | None = None):
    item = {"item_id": item_id, "needy": needy, "skip": skip, "limit": limit}
    return item

#using query params
@app.get("/items/")
async def read_quereies(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]
    
# Example of params and queries
@app.get("/users/{user_id}/items/{item_id}")
async def read_user_item(user_id: int, item_id: str, q: str | None = None, short: bool = False):
    item = {"item_id": item_id, "owner_id": user_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item

#getting the rest of the path
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path}

#Using simple parameter
@app.get("/stuff/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
    
# Using Enumerate
@app.get("/models/{model_name}")
async def get_model(model_name : ModelName):
    match model_name:
        case ModelName.alexnet:
            return {"model_name": model_name, "message": "Deep Learning FTW!"}
        case ModelName.resnet:
            return {"model_name": model_name, "message": "ResNet is the best!"}
        case ModelName.lenet:
            return {"model_name": model_name, "message": "LeCun rocks!"}
        case _:
            return {"model_name": model_name, "message": "Unknown model"}