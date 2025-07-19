from fastapi import APIRouter, Query
from database.mongodb import products_collection
from models.schemas import ProductCreate
from bson import ObjectId
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/")
async def create_product(product: ProductCreate):
    result = await products_collection.insert_one(product.dict())
    return JSONResponse(
        status_code=201,
        content={"message": "Product created successfully", "product_id": str(result.inserted_id)}
    )

@router.get("/")
async def list_products(name: str = None, size: str = None, limit: int = 10, offset: int = 0):
    query = {}
    if name:
        query["name"] = {"$regex": name, "$options": "i"}
    if size:
        query["sizes"] = size

    cursor = products_collection.find(query).skip(offset).limit(limit)
    results = []
    async for product in cursor:
        results.append({
            "id": str(product["_id"]),
            "name": product["name"],
            "price": product["price"],
            "sizes": product["sizes"]
        })
    return results
