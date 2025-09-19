export async function getCategories() {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories' , {
            cache: 'no-cache' ,
            next: {revalidate: 120 , tags:['categories']},
        },
    )
        if (!res.ok) {
            throw new Error(res.statusText || "Failed to fetch categories");
        }
        const data = await res.json();
        return data ;
    } catch(error) {
        return {error: error as string};
    }
}

export async function getCategoryDetails(categoryId:string){
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, {
            cache: 'no-cache' ,
            next: {revalidate: 120 , tags:['category Id']},
        },)
        if (!res.ok) {
            throw new Error(res.statusText || "Failed to fetch category Id");
        }
        const data = await res.json();
        return data ;
    } catch(error) {
        return {error: error as string};
    }
}



export async function getSubCategories() {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/subcategories' , {
            cache: 'no-cache' ,
            next: {revalidate: 120 , tags:['subCategories']},
        },
    )
        if (!res.ok) {
            throw new Error(res.statusText || "Failed to fetch subCategories");
        }
        const data = await res.json();
        return data ;
    } catch(error) {
        return {error: error as string};
    }
}

