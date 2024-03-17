import { CDN_IMAGES } from './cdn-images';

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const API_URL_NEST = import.meta.env.VITE_URL_NEST;
export const API_URL_SPRING = import.meta.env.VITE_URL_SPRING;

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;

export const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET = import.meta.env
  .VITE_FIREBASE_STORAGE_BUCKET;

export const FIREBASE_MESSAGING_SENDER_ID = import.meta.env
  .VITE_FIREBASE_MESSAGING_SENDER_ID;

export const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
export const FIREBASE_VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const DEFAULT_VISITOR_IMAGE_URL = CDN_IMAGES.visitor.mascot;
export const DEFAULT_MEMBER_IMAGE_URL = CDN_IMAGES.mascot.normal;
export const DEFAULT_STAMP_IMAGE_URL = CDN_IMAGES.mascot.normal;
