// TypeScript type definitions for The Berlin Store

// ─── User ────────────────────────────────────────────────────────────────────

export type UserRole = 'customer' | 'admin' | 'superadmin';

export interface BerlinUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  role: UserRole;
  rewardPoints: number;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

// ─── Address ─────────────────────────────────────────────────────────────────

export interface Address {
  id: string;
  userId: string;
  type: 'home' | 'work' | 'other';
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface ProductSize {
  size: string;
  stock: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  subcategory?: string;
  sku: string;
  barcode?: string;
  price: number;
  offerPrice?: number;
  discountPercent?: number;
  stock: number;
  sizes: ProductSize[];
  colors: ProductColor[];
  material?: string;
  gender: 'men' | 'women' | 'kids' | 'unisex';
  season?: 'summer' | 'winter' | 'all-season' | 'monsoon';
  weight?: number;
  tags: string[];
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isLimitedEdition: boolean;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  updatedAt: Date;
}

// ─── Wishlist ────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: Date;
}

// ─── Order ───────────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'return_requested' | 'returned' | 'refunded';
export type PaymentMethod = 'razorpay' | 'cod' | 'gift_card';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  thumbnail: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
}

export interface Order {
  id: string;
  orderId: string; // human-readable like BS-2024-0001
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  couponDiscount: number;
  shippingCost: number;
  tax: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  deliveryStatus: OrderStatus;
  trackingNumber?: string;
  invoiceUrl?: string;
  timeline: OrderTimeline[];
  returnStatus?: 'none' | 'requested' | 'approved' | 'rejected' | 'returned';
  refundStatus?: 'none' | 'initiated' | 'processed';
  refundAmount?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Payment ─────────────────────────────────────────────────────────────────

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  createdAt: Date;
}

// ─── Coupon ──────────────────────────────────────────────────────────────────

export type CouponType = 'percentage' | 'flat' | 'buy_x_get_y' | 'free_shipping';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number; // percentage or flat amount
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  perUserLimit?: number;
  validFrom: Date;
  validUntil: Date;
  applicableCategories?: string[];
  applicableProducts?: string[];
  isActive: boolean;
  description?: string;
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedBuyer: boolean;
  isApproved: boolean;
  helpfulCount: number;
  createdAt: Date;
}

// ─── Notification ────────────────────────────────────────────────────────────

export type NotificationType = 'order' | 'payment' | 'sale' | 'arrival' | 'wishlist' | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
}

// ─── Offer / Banner ──────────────────────────────────────────────────────────

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  mobileImage?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle?: string;
  discountText: string;
  ctaText: string;
  ctaLink: string;
  endsAt?: Date;
  backgroundColor: string;
  textColor: string;
  image?: string;
  isActive: boolean;
}

// ─── Shipping ────────────────────────────────────────────────────────────────

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isActive: boolean;
  minOrderForFree?: number;
}

// ─── Inventory ───────────────────────────────────────────────────────────────

export interface InventoryLog {
  id: string;
  productId: string;
  productName: string;
  action: 'restock' | 'sale' | 'return' | 'adjustment';
  quantityChange: number;
  previousStock: number;
  newStock: number;
  orderId?: string;
  note?: string;
  createdAt: Date;
  createdBy: string;
}

// ─── Gift Card ───────────────────────────────────────────────────────────────

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  purchasedBy: string;
  assignedTo?: string;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
}

// ─── Newsletter ──────────────────────────────────────────────────────────────

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  subscribedAt: Date;
}

// ─── Contact Message ─────────────────────────────────────────────────────────

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: Date;
}

// ─── Settings ────────────────────────────────────────────────────────────────

export interface StoreSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  whatsappNumber: string;
  storeAddress: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  freeShippingThreshold: number;
  instagramHandle?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  businessHours: BusinessHour[];
  maintenanceMode: boolean;
}

export interface BusinessHour {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface DailyAnalytics {
  date: string;
  revenue: number;
  orders: number;
  visitors: number;
  newCustomers: number;
}
