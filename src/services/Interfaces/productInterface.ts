export interface Product {
    "id": string,
    "name": string,
    "description": string,
    "price": number,
    "category": string,
    "stock": {
      "available": number,
      "reserved": number,
      "location": string
    },
    "tags": string[],
    "rating": number,
    "deleted": boolean
}

export interface ProductJson {
    products: Product[]
}