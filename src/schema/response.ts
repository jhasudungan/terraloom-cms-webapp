import { Metadata, Category, Product, User, Order, OrderWithItems, Account, OrderReport, AccountReport } from "@/schema/entity";

// Response Data
interface GetCategoryListResponseData {
    categories:  Category[],
    metadata:  Metadata
}

interface GetUserListResponseData {
    users: User[],
    metadata: Metadata
}

interface GetAccountListResponseData {
    accounts: Account[],
    metadata: Metadata
}

interface GetProductListResponseData {
    products: Product[],
    metadata: Metadata
}

interface GetOrderListResponseData {
    orders: Order[],
    metadata: Metadata
}

interface GetProfileDetailResponseData {
    user: User
}

interface GetUserDetailResponseData {
    user: User
}

interface GetAccountDetailResponseData {
    account: Account
}

interface GetCategoryDetailResponseData {
    category:  Category
}

interface GetProductDetailResponseData {
    product: Product
}

interface GetOrderDetailResponseData {
    order: OrderWithItems
}

interface GetDashboardReportResponseData {
    orderReport: OrderReport
    accountReport: AccountReport
}

// Response
interface GetCategoryListResponse {
    data: GetCategoryListResponseData
}

interface GetCategoryDetailResponse {
    data: GetCategoryDetailResponseData
}

interface GetProductListResponse {
    data: GetProductListResponseData
}

interface GetUserListResponse {
    data: GetUserListResponseData
}

interface GetAccountListResponse {
    data: GetAccountListResponseData
}

interface GetOrderListResponse {
    data: GetOrderListResponseData
}

interface GetProductDetailResponse {
    data: GetProductDetailResponseData
}

interface GetUserDetailResponse {
    data: GetUserDetailResponseData
}

interface GetAccountDetailResponse {
    data: GetAccountDetailResponseData
}

interface GetProfileDetailResponse {
    data: GetProfileDetailResponseData
}

interface GetOrderDetailResponse {
    data: GetOrderDetailResponseData
}

interface GetDashboardReportResponse {
    data: GetDashboardReportResponseData
}

export type {
    GetCategoryListResponse,
    GetCategoryDetailResponse,
    GetProductListResponse,
    GetProductDetailResponse,
    GetUserListResponseData,
    GetUserListResponse,
    GetUserDetailResponseData,
    GetUserDetailResponse,
    GetProfileDetailResponse,
    GetProfileDetailResponseData,
    GetOrderListResponseData,
    GetOrderListResponse,
    GetOrderDetailResponse,
    GetAccountListResponse,
    GetAccountDetailResponse,
    GetAccountDetailResponseData,
    GetAccountListResponseData,
    GetDashboardReportResponseData,
    GetDashboardReportResponse
}