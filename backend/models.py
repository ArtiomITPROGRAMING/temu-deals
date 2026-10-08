from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field


class PricePoint(BaseModel):
    date: str
    price: float


class StoreOffer(BaseModel):
    storeId: str
    storeName: str
    storeLogo: Optional[str] = None
    price: float
    oldPrice: float
    url: str
    inStock: bool = True
    deliveryDays: int = 7
    freeDelivery: bool = True
    cashbackPercent: Optional[float] = None


class Product(BaseModel):
    id: str
    title: str
    category: str
    subcategory: Optional[str] = None
    brand: str
    image: str
    images: Optional[List[str]] = None
    description: str
    currentPrice: float
    oldPrice: float
    store: str = "Temu"
    storeUrl: str
    rating: float = 4.8
    reviewsCount: int = 1500
    freeDelivery: bool = True
    history: List[PricePoint] = Field(default_factory=list)
    storeOffers: List[StoreOffer] = Field(default_factory=list)
    specs: Dict[str, str] = Field(default_factory=dict)
    updatedAt: str = ""
    isHot: bool = True


class DealAnalysis(BaseModel):
    productId: str
    shopDiscountPercent: int
    averagePrice90d: float
    minPriceHistorical: float
    maxPriceHistorical: float
    realSavings: float
    realDiscountPercent: int
    dealStatus: Literal["super_deal", "good_price", "normal_price", "high_price"]
    statusBadge: str
    dealScore: int
    verdict: str
    isArtificialDiscount: bool


class TemuLinkRequest(BaseModel):
    url: str


class TemuLinkResponse(BaseModel):
    success: bool
    goodsId: Optional[str] = None
    title: Optional[str] = None
    originalPrice: Optional[float] = None
    flashPrice: Optional[float] = None
    discountPercent: Optional[int] = None
    imageUrl: Optional[str] = None
    inStock: bool = True
    message: str


class TemuAddressModel(BaseModel):
    fullName: str
    phone: str
    country: str = "Россия"
    city: str
    street: str
    postalCode: str


class TemuOrderModel(BaseModel):
    id: str
    temuOrderId: str
    itemsCount: int
    totalPrice: float
    currency: str = "RUB"
    status: str = "shipped"
    statusLabel: str = "В пути (Авиаперевозка из Китая)"
    trackingNumber: str = ""
    estimatedDelivery: str = "7-12 дней"
    createdAt: str = ""


class TemuAuthRequest(BaseModel):
    method: Literal["phone", "email", "qr", "token"]
    credential: str
    verificationCode: Optional[str] = None


class TemuAccountResponse(BaseModel):
    isConnected: bool
    emailOrPhone: str
    name: str
    avatar: Optional[str] = None
    shippingAddress: Optional[TemuAddressModel] = None
    orders: List[TemuOrderModel] = Field(default_factory=list)
    token: str


class SyncCartItem(BaseModel):
    productId: str
    quantity: int
    price: float


class SyncCartRequest(BaseModel):
    items: List[SyncCartItem]
    accountPhoneOrEmail: Optional[str] = None


class SyncCartResponse(BaseModel):
    success: bool
    syncedItemsCount: int
    temuBasketId: str
    totalAmount: float
    freeShipping: bool
    checkoutUrl: str
    message: str
