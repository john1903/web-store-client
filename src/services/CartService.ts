import { CartItemRequest } from "@/types/carts/cartItem";
import { Cart, CartRequest } from "@/types/carts/cart";
import { addCartItem, emptyCart, fetchCart, updateCart } from "@/api/cartApi";
import { getJwtToken, isAuthenticated } from "@/common/commonImports";
import { fetchProduct } from "@/api/productApi";

const LOCAL_STORAGE_KEY = "cart";

export class CartService {
  async getCart(): Promise<Cart> {
    const jwt = getJwtToken();
    if (isAuthenticated() && jwt) {
      const response = await fetchCart(jwt);
      if (response.ok) {
        return response.data;
      } else {
        throw new Error(response.error.message);
      }
    }
    return await this.mapCartRequestToCart(
      this.getCartRequestFromLocalStorage()
    );
  }

  async addCartItem(cartItemRequest: CartItemRequest): Promise<void> {
    const jwt = getJwtToken();
    console.log(cartItemRequest);
    if (isAuthenticated() && jwt) {
      const response = await addCartItem(cartItemRequest, jwt);
      if (response.ok) {
        return;
      } else {
        throw new Error(response.error.message);
      }
    }
    this.addCartItemToLocalStorage(cartItemRequest);
  }

  async updateCart(cartRequest: CartRequest): Promise<void> {
    const jwt = getJwtToken();
    if (isAuthenticated() && jwt) {
      const response = await updateCart(cartRequest, jwt);
      if (response.ok) {
        return;
      } else {
        throw new Error(response.error.message);
      }
    }
    this.setCartToLocalStorage(cartRequest);
  }

  async emptyCart(): Promise<void> {
    const jwt = getJwtToken();
    if (isAuthenticated() && jwt) {
      const response = await emptyCart(jwt);
      if (response.ok) {
        return;
      } else {
        throw new Error(response.error.message);
      }
    }
    this.emptyCartInLocalStorage();
  }

  private async mapCartRequestToCart(cartRequest: CartRequest): Promise<Cart> {
    const cartItems = await Promise.all(
      cartRequest.items.map(async (item, index) => {
        const productResponse = await fetchProduct(item.productId);
        if (!productResponse.ok) {
          throw new Error(
            productResponse.error.message || "Error fetching product"
          );
        }
        return {
          id: index + 1,
          product: productResponse.data,
          quantity: item.quantity,
          subtotal: productResponse.data.price * item.quantity,
        };
      })
    );
    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    return {
      id: 1,
      customerId: 1,
      items: cartItems,
      total: Math.round(total * 100) / 100,
    };
  }

  private getCartRequestFromLocalStorage(): CartRequest {
    const baseCart: CartRequest = {
      items: [],
    };
    const cartStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cartStr) {
      try {
        return JSON.parse(cartStr);
      } catch (error) {
        console.error("Error parsing cart from local storage:", error);
        this.setCartToLocalStorage(baseCart);
        return baseCart;
      }
    }
    this.setCartToLocalStorage(baseCart);
    return baseCart;
  }

  private setCartToLocalStorage(cartRequest: CartRequest): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartRequest));
  }

  private addCartItemToLocalStorage(cartItemRequest: CartItemRequest): void {
    const cart = this.getCartRequestFromLocalStorage();
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === cartItemRequest.productId
    );
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex] = {
        ...cart.items[existingItemIndex],
        quantity:
          cart.items[existingItemIndex].quantity + cartItemRequest.quantity,
      };
    } else {
      cart.items.push(cartItemRequest);
    }
    this.setCartToLocalStorage(cart);
  }

  private emptyCartInLocalStorage(): void {
    const cart = this.getCartRequestFromLocalStorage();
    cart.items = [];
    this.setCartToLocalStorage(cart);
  }
}

let cartService: CartService | null = null;

export function useCart(): CartService {
  if (!cartService) {
    cartService = new CartService();
  }
  return cartService;
}
