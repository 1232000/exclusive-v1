export async function getProducts(limit=40 , categoryId?:string , brandId?:string ) {
    const endpoint = 
    categoryId ?`limit=${limit}&category[in]=${categoryId}` 
    : brandId? `limit=${limit}&brand=${brandId}`
    : `limit=${limit}`;
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?${endpoint}` , {
            cache: 'no-cache' ,
            next: {revalidate: 120 , tags:['products']},
        },
    );
        if (!res.ok) {
            throw new Error(res.statusText || "Failed to fetch products");
        }
        const data = await res.json();
        return data ;
    } catch(error) {
        return {error: error as string};
    }
}

export async function getProductsDetails(id:string) {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}` , {
            cache: 'no-cache' ,
            next: {revalidate: 120 , tags:['products']},
        },
    );
        if (!res.ok) {
            throw new Error(res.statusText || "Failed to fetch products");
        }
        const data = await res.json();
        return data ;
    } catch(error) {
        return {error: error as string};
    }
}