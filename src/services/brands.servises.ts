
export async function getBrands(limit=40) {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?limit=${limit}` , {
            cache: 'no-cache' ,
            next: {revalidate: 120 , tags:['brands']},
        },
    )
        if (!res.ok) {
            throw new Error(res.statusText || "Failed to fetch brands");
        }
        const data = await res.json();
        return data ;
    } catch(error) {
        return {error: error as string};
    }
}

export async function getBrandDetails(brandId:string) {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}` , {
            cache: 'no-cache' ,
            next: {revalidate: 120 , tags:['brands']},
        },
    )
        if (!res.ok) {
            throw new Error(res.statusText || "Failed to fetch brands");
        }
        const data = await res.json();
        return data ;
    } catch(error) {
        return {error: error as string};
    }
}