from fastapi import APIRouter
from database.mongodb import orders_collection, products_collection
from models.schemas import OrderCreate
from fastapi.responses import JSONResponse
from bson import ObjectId
from datetime import datetime

router = APIRouter()

@router.post("/")
async def create_order(order: OrderCreate):
    timestamp = datetime.utcnow()
    order_data = {
        "user_id": order.user_id,
        "product_ids": order.product_ids,
        "timestamp": timestamp
    }
    result = await orders_collection.insert_one(order_data)
    return JSONResponse(
        status_code=201,
        content={"message": "Order placed successfully", "order_id": str(result.inserted_id)}
    )

@router.get("/{user_id}")
async def list_orders(user_id: str, limit: int = 10, offset: int = 0):
    cursor = orders_collection.find({"user_id": user_id}).skip(offset).limit(limit)
    orders = []
    async for order in cursor:
        product_names = []
        for pid in order["product_ids"]:
            product = await products_collection.find_one({"_id": ObjectId(pid)})
            if product:
                product_names.append(product["name"])

        orders.append({
            "order_id": str(order["_id"]),
            "user_id": order["user_id"],
            "products": product_names,
            "timestamp": order["timestamp"]
        })
    return orders
