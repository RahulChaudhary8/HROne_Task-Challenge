from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class ProductCreate(BaseModel):
    name: str
    price: float
    sizes: List[str]

class ProductOut(ProductCreate):
    id: str

class OrderCreate(BaseModel):
    user_id: str
    product_ids: List[str]

class OrderOut(BaseModel):
    order_id: str
    user_id: str
    products: List[str]
    timestamp: datetime
