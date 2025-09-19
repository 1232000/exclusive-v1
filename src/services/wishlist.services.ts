"use server"

import getUserToken from "@/lib/server-utils";

export async function getUserWishlist() {
    try {
        const token = await getUserToken();
        const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist` , {
            headers:{
                token:token as string,
            },
        },);

        const data = await res.json();
    
        if (!res.ok) {
        return {
          data: null,
					success: false,
					message: data.message || "Error in Fetching wishlist",
				} ;
			}
        return {
          data: {
            status: data.status,
            count: data.data.length,
            data: data.data,
          },
          success: true,
          message: data.message || "Fetched wishlist successfully",
        };

    } catch(error) {
        return {
          data: null,
					success: false,
					message: error as string ||"Something went wrong",
				}}
}

export async function addToWishlist(productId: string) {
  try {
      const token = await getUserToken();
        if(!token){
          return{
          data: null,
					success: false,
					message: "Please login first",
        }
        }
      const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist` , {
          method: 'POST',
          headers:{
              "Content-Type": "application/json",
              token:token as string,
          },
          body: JSON.stringify({productId}),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          data: null,
					success: false,
					message: data.message || "Adding to wishlist failed",
				} ;
			}
        return {
          data: data,
					success: true,
					message: data.message || "Added to wishlist successfully",
				} ;
    } catch(error) {
        return {
          data: null,
					success: false,
					message: error as string ||"Something went wrong",
				}}
}

export async function removeWishlistItem(productId: string) {
  try {
      const token = await getUserToken();
      const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist/${productId}` , {
          method: 'DELETE',
          headers:{
            "Content-Type": "application/json",
            token:token as string,
          },
          body: JSON.stringify({productId}),
      });

      const data = await res.json();
      if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Deleting from wishlist failed",
      } ;
    }
      return{
        data: {
          status: data.status,
          count: data.data.length,
          data: data.data,
        },
        success: true,
        message: data.message || "Deleted from wishlist successfully",
      };

  } catch(error) {
      return {
        data: null,
        success: false,
        message: error as string ||"Something went wrong",
      } ;
    }
}
