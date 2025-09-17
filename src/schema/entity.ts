interface Category {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

interface CategoryOnProduct {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    imageUrl: string;
    category : CategoryOnProduct;
}

interface User {
    id: number;
    role: string;
    email: string;
    displayName: string;
    username: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

interface Account {
    id: number;
    email: string;
    displayName: string;
    username: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

interface Payment {
    paymentReference: string,
    total: number,
    paymentDate: string,
    status: string,
    cardHolderName: string,
    cardNumber: string
}

interface Order {
    orderReference: string,
    total: number,
    orderDate: string,
    status: string
    payment: Payment
}

interface ProductOnOrderItem {
    id: number,
    name: string,
    imageUrl: string
}

interface OrderItem {
    orderItemReference: string,
    quantity: number,
    priceSnapshot: number,
    total: number,
    product: ProductOnOrderItem
}

interface OrderWithItems {
    orderReference: string,
    total: number,
    orderDate: string,
    status: string
    deliveryAddress: string,
    payment: Payment
    orderItems: OrderItem[]
}

interface OrderReport {
    total: number,
    pendingOrder: number,
    finishedOrder: number,
    paidOrder: number,
    cancelledOrder: number,
    failedOrder: number
}

interface AccountReport {
    activeAccount: number,
    inactiveAccount: number,
    adminAccount: number
}

interface Metadata {
    page: number;
    perPage: number;
    totalData: number;
    totalPage: number;
}

interface CategorySearchParams {
    name?: string;
    isActive?: string;
    page?: string;
}

interface ProductSearchParams {
    name?: string;
    categoryName?: string;
    isActive?: string;
    page?: string;
}

interface UsersSearchParams {
    displayName?: string;
    username?: string;
    email?: string;
    isActive?: string;
    page?: string;
}

interface AccountSearchParams {
    displayName?: string;
    username?: string;
    email?: string;
    isActive?: string;
    page?: string;
}

interface OrderSearchParams {
    orderReference?: string;
    page?: string;
}

interface RestConfiguration {
    apiCmsHost: string,
    apiCmsAccessToken: string
    apiCMSDefaultPerpage: string
}

export type {
    Product,
    Category,
    User,
    Order,
    Payment,
    OrderItem,
    OrderWithItems,
    ProductOnOrderItem,
    CategoryOnProduct,
    Account,
    OrderReport,
    AccountReport,
    Metadata,
    ProductSearchParams,
    CategorySearchParams,
    UsersSearchParams,
    OrderSearchParams,
    AccountSearchParams,
    RestConfiguration
}