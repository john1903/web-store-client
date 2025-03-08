import { jwtDecode } from "jwt-decode";
import { BearerToken } from "@/types/security/bearerToken";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies";

interface JwtPayload {
  sub: string;
  id: number;
  exp: number;
  roles: string[];
}

export function setToken(bearerToken: BearerToken, expiry: number) {
  setCookie("token", bearerToken.token, expiry);
}

export function getJwtToken(): BearerToken | undefined {
  const jwt = getCookie("token");
  if (!jwt) return undefined;
  return { token: jwt };
}

export function getJwtPayload(
  bearerToken: BearerToken
): JwtPayload | undefined {
  try {
    return jwtDecode<JwtPayload>(bearerToken.token);
  } catch (error) {
    return undefined;
  }
}

export function getExpiry(bearerToken: BearerToken): number {
  try {
    const decoded = jwtDecode<JwtPayload>(bearerToken.token);
    return decoded.exp * 1000;
  } catch (error) {
    return 0;
  }
}

export function expireToken() {
  deleteCookie("token");
}

function isTokenExpired(): boolean {
  const jwt = getJwtToken();
  if (!jwt) return true;
  try {
    const decoded = jwtDecode<JwtPayload>(jwt.token);
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    return true;
  }
}

export function isAuthenticated(): boolean {
  return !isTokenExpired();
}

export function hasRole(role: string): boolean {
  const jwt = getJwtToken();
  if (!jwt) return false;
  try {
    const decoded = jwtDecode<JwtPayload>(jwt.token);
    const roleToCheck = role.startsWith("ROLE_") ? role : `ROLE_${role}`;
    return decoded.roles.includes(roleToCheck);
  } catch (error) {
    return false;
  }
}
