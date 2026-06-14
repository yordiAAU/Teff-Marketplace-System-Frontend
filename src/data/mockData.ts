export interface ProductCatalogItem {
  id: number;
  name: string;
  category: string;
}

export interface FarmerProduct {
  id: number;
  catalogId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  stock: string;
  status: 'Active' | 'Out of Stock';
}

export interface FarmerUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joined: string;
  products: string[];
  totalSales: number;
  rating: number;
}

export interface CustomerUser {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Pending' | 'Suspended';
  joined: string;
}

export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface PricePoint {
  label: string;
  price: number;
  high: number;
  low: number;
}

export const PRODUCT_CATALOG: ProductCatalogItem[] = [
  { id: 1, name: 'Premium White Teff', category: 'White Teff' },
  { id: 2, name: 'Organic Brown Teff', category: 'Brown Teff' },
  { id: 3, name: 'Mixed Grain Teff', category: 'Mixed Teff' },
  { id: 4, name: 'Red Teff Flour', category: 'Flour' },
  { id: 5, name: 'Fermented Teff Starter', category: 'Starter' },
];

export const MOCK_FARMER_PRODUCTS: FarmerProduct[] = [
  {
    id: 1,
    catalogId: 1,
    name: 'Premium White Teff',
    description: 'High-quality white teff grain grown in the Ethiopian highlands. Stone-milled and sun-dried for optimal freshness.',
    price: 120,
    quantity: 50,
    stock: '50 bags',
    status: 'Active',
  },
  {
    id: 2,
    catalogId: 2,
    name: 'Organic Brown Teff',
    description: 'Certified organic brown teff with rich nutty flavor. Perfect for injera and traditional dishes.',
    price: 95,
    quantity: 30,
    stock: '30 bags',
    status: 'Active',
  },
  {
    id: 3,
    catalogId: 3,
    name: 'Mixed Grain Teff',
    description: 'A balanced blend of white and brown teff varieties. Ideal for diverse culinary applications.',
    price: 110,
    quantity: 0,
    stock: '0 bags',
    status: 'Out of Stock',
  },
];

export const MOCK_FARMERS: FarmerUser[] = [
  {
    id: 1,
    name: 'Abebe Kebede',
    email: 'abebe@example.com',
    phone: '+251 911 234 567',
    location: 'Addis Ababa, Ethiopia',
    status: 'Active',
    joined: 'Jan 12, 2024',
    products: ['Premium White Teff', 'Organic Brown Teff'],
    totalSales: 8420,
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Sara Tadesse',
    email: 'sara@example.com',
    phone: '+251 922 345 678',
    location: 'Bahir Dar, Ethiopia',
    status: 'Active',
    joined: 'Jan 15, 2024',
    products: ['Organic Brown Teff', 'Red Teff Flour'],
    totalSales: 6150,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Dawit Isaac',
    email: 'dawit@example.com',
    phone: '+251 933 456 789',
    location: 'Hawassa, Ethiopia',
    status: 'Pending',
    joined: 'Feb 10, 2024',
    products: ['Mixed Grain Teff', 'Fermented Teff Starter'],
    totalSales: 2100,
    rating: 4.5,
  },
];

export const MOCK_CUSTOMERS: CustomerUser[] = [
  { id: 3, name: 'Helen Gebre', email: 'helen@example.com', status: 'Active', joined: 'Feb 02, 2024' },
  { id: 5, name: 'Mulugeta Tesfaye', email: 'mulu@example.com', status: 'Active', joined: 'Feb 15, 2024' },
  { id: 6, name: 'John Doe', email: 'john@example.com', status: 'Suspended', joined: 'Mar 01, 2024' },
];

export const PRICE_TREND_DATA: Record<number, Record<TimeRange, PricePoint[]>> = {
  1: {
    day: [
      { label: '6AM', price: 480, high: 490, low: 470 },
      { label: '8AM', price: 495, high: 505, low: 485 },
      { label: '10AM', price: 510, high: 520, low: 500 },
      { label: '12PM', price: 525, high: 535, low: 515 },
      { label: '2PM', price: 540, high: 550, low: 530 },
      { label: '4PM', price: 555, high: 565, low: 545 },
      { label: '6PM', price: 570, high: 580, low: 560 },
      { label: '8PM', price: 585, high: 600, low: 575 },
    ],
    week: [
      { label: 'Mon', price: 520, high: 540, low: 510 },
      { label: 'Tue', price: 535, high: 555, low: 525 },
      { label: 'Wed', price: 510, high: 530, low: 500 },
      { label: 'Thu', price: 545, high: 565, low: 535 },
      { label: 'Fri', price: 560, high: 580, low: 550 },
      { label: 'Sat', price: 575, high: 595, low: 565 },
      { label: 'Sun', price: 590, high: 610, low: 580 },
    ],
    month: [
      { label: 'W1', price: 480, high: 510, low: 460 },
      { label: 'W2', price: 510, high: 540, low: 490 },
      { label: 'W3', price: 540, high: 570, low: 520 },
      { label: 'W4', price: 570, high: 600, low: 550 },
    ],
    year: [
      { label: 'Jan', price: 420, high: 450, low: 400 },
      { label: 'Feb', price: 440, high: 470, low: 420 },
      { label: 'Mar', price: 460, high: 490, low: 440 },
      { label: 'Apr', price: 480, high: 510, low: 460 },
      { label: 'May', price: 510, high: 540, low: 490 },
      { label: 'Jun', price: 540, high: 570, low: 520 },
      { label: 'Jul', price: 560, high: 590, low: 540 },
      { label: 'Aug', price: 580, high: 610, low: 560 },
      { label: 'Sep', price: 570, high: 600, low: 550 },
      { label: 'Oct', price: 590, high: 620, low: 570 },
      { label: 'Nov', price: 600, high: 630, low: 580 },
      { label: 'Dec', price: 610, high: 640, low: 590 },
    ],
  },
  2: {
    day: [
      { label: '6AM', price: 380, high: 390, low: 370 },
      { label: '8AM', price: 395, high: 405, low: 385 },
      { label: '10AM', price: 410, high: 420, low: 400 },
      { label: '12PM', price: 425, high: 435, low: 415 },
      { label: '2PM', price: 440, high: 450, low: 430 },
      { label: '4PM', price: 455, high: 465, low: 445 },
      { label: '6PM', price: 470, high: 480, low: 460 },
      { label: '8PM', price: 485, high: 500, low: 475 },
    ],
    week: [
      { label: 'Mon', price: 420, high: 440, low: 410 },
      { label: 'Tue', price: 435, high: 455, low: 425 },
      { label: 'Wed', price: 410, high: 430, low: 400 },
      { label: 'Thu', price: 445, high: 465, low: 435 },
      { label: 'Fri', price: 460, high: 480, low: 450 },
      { label: 'Sat', price: 475, high: 495, low: 465 },
      { label: 'Sun', price: 490, high: 510, low: 480 },
    ],
    month: [
      { label: 'W1', price: 400, high: 430, low: 380 },
      { label: 'W2', price: 430, high: 460, low: 410 },
      { label: 'W3', price: 460, high: 490, low: 440 },
      { label: 'W4', price: 490, high: 520, low: 470 },
    ],
    year: [
      { label: 'Jan', price: 350, high: 380, low: 330 },
      { label: 'Feb', price: 370, high: 400, low: 350 },
      { label: 'Mar', price: 390, high: 420, low: 370 },
      { label: 'Apr', price: 410, high: 440, low: 390 },
      { label: 'May', price: 430, high: 460, low: 410 },
      { label: 'Jun', price: 450, high: 480, low: 430 },
      { label: 'Jul', price: 470, high: 500, low: 450 },
      { label: 'Aug', price: 490, high: 520, low: 470 },
      { label: 'Sep', price: 480, high: 510, low: 460 },
      { label: 'Oct', price: 500, high: 530, low: 480 },
      { label: 'Nov', price: 510, high: 540, low: 490 },
      { label: 'Dec', price: 520, high: 550, low: 500 },
    ],
  },
  3: {
    day: [
      { label: '6AM', price: 450, high: 460, low: 440 },
      { label: '8AM', price: 465, high: 475, low: 455 },
      { label: '10AM', price: 480, high: 490, low: 470 },
      { label: '12PM', price: 495, high: 505, low: 485 },
      { label: '2PM', price: 510, high: 520, low: 500 },
      { label: '4PM', price: 525, high: 535, low: 515 },
      { label: '6PM', price: 540, high: 550, low: 530 },
      { label: '8PM', price: 555, high: 570, low: 545 },
    ],
    week: [
      { label: 'Mon', price: 480, high: 500, low: 470 },
      { label: 'Tue', price: 495, high: 515, low: 485 },
      { label: 'Wed', price: 470, high: 490, low: 460 },
      { label: 'Thu', price: 505, high: 525, low: 495 },
      { label: 'Fri', price: 520, high: 540, low: 510 },
      { label: 'Sat', price: 535, high: 555, low: 525 },
      { label: 'Sun', price: 550, high: 570, low: 540 },
    ],
    month: [
      { label: 'W1', price: 440, high: 470, low: 420 },
      { label: 'W2', price: 470, high: 500, low: 450 },
      { label: 'W3', price: 500, high: 530, low: 480 },
      { label: 'W4', price: 530, high: 560, low: 510 },
    ],
    year: [
      { label: 'Jan', price: 380, high: 410, low: 360 },
      { label: 'Feb', price: 400, high: 430, low: 380 },
      { label: 'Mar', price: 420, high: 450, low: 400 },
      { label: 'Apr', price: 440, high: 470, low: 420 },
      { label: 'May', price: 470, high: 500, low: 450 },
      { label: 'Jun', price: 500, high: 530, low: 480 },
      { label: 'Jul', price: 520, high: 550, low: 500 },
      { label: 'Aug', price: 540, high: 570, low: 520 },
      { label: 'Sep', price: 530, high: 560, low: 510 },
      { label: 'Oct', price: 550, high: 580, low: 530 },
      { label: 'Nov', price: 560, high: 590, low: 540 },
      { label: 'Dec', price: 570, high: 600, low: 550 },
    ],
  },
  4: {
    day: [
      { label: '6AM', price: 320, high: 330, low: 310 },
      { label: '8AM', price: 335, high: 345, low: 325 },
      { label: '10AM', price: 350, high: 360, low: 340 },
      { label: '12PM', price: 365, high: 375, low: 355 },
      { label: '2PM', price: 380, high: 390, low: 370 },
      { label: '4PM', price: 395, high: 405, low: 385 },
      { label: '6PM', price: 410, high: 420, low: 400 },
      { label: '8PM', price: 425, high: 440, low: 415 },
    ],
    week: [
      { label: 'Mon', price: 360, high: 380, low: 350 },
      { label: 'Tue', price: 375, high: 395, low: 365 },
      { label: 'Wed', price: 350, high: 370, low: 340 },
      { label: 'Thu', price: 385, high: 405, low: 375 },
      { label: 'Fri', price: 400, high: 420, low: 390 },
      { label: 'Sat', price: 415, high: 435, low: 405 },
      { label: 'Sun', price: 430, high: 450, low: 420 },
    ],
    month: [
      { label: 'W1', price: 340, high: 370, low: 320 },
      { label: 'W2', price: 370, high: 400, low: 350 },
      { label: 'W3', price: 400, high: 430, low: 380 },
      { label: 'W4', price: 430, high: 460, low: 410 },
    ],
    year: [
      { label: 'Jan', price: 280, high: 310, low: 260 },
      { label: 'Feb', price: 300, high: 330, low: 280 },
      { label: 'Mar', price: 320, high: 350, low: 300 },
      { label: 'Apr', price: 340, high: 370, low: 320 },
      { label: 'May', price: 360, high: 390, low: 340 },
      { label: 'Jun', price: 380, high: 410, low: 360 },
      { label: 'Jul', price: 400, high: 430, low: 380 },
      { label: 'Aug', price: 420, high: 450, low: 400 },
      { label: 'Sep', price: 410, high: 440, low: 390 },
      { label: 'Oct', price: 430, high: 460, low: 410 },
      { label: 'Nov', price: 440, high: 470, low: 420 },
      { label: 'Dec', price: 450, high: 480, low: 430 },
    ],
  },
  5: {
    day: [
      { label: '6AM', price: 55, high: 58, low: 52 },
      { label: '8AM', price: 58, high: 61, low: 55 },
      { label: '10AM', price: 62, high: 65, low: 59 },
      { label: '12PM', price: 65, high: 68, low: 62 },
      { label: '2PM', price: 68, high: 71, low: 65 },
      { label: '4PM', price: 72, high: 75, low: 69 },
      { label: '6PM', price: 75, high: 78, low: 72 },
      { label: '8PM', price: 78, high: 82, low: 75 },
    ],
    week: [
      { label: 'Mon', price: 60, high: 65, low: 55 },
      { label: 'Tue', price: 65, high: 70, low: 60 },
      { label: 'Wed', price: 62, high: 67, low: 58 },
      { label: 'Thu', price: 68, high: 73, low: 63 },
      { label: 'Fri', price: 72, high: 77, low: 67 },
      { label: 'Sat', price: 76, high: 81, low: 71 },
      { label: 'Sun', price: 80, high: 85, low: 75 },
    ],
    month: [
      { label: 'W1', price: 55, high: 65, low: 50 },
      { label: 'W2', price: 62, high: 72, low: 57 },
      { label: 'W3', price: 70, high: 80, low: 65 },
      { label: 'W4', price: 78, high: 88, low: 73 },
    ],
    year: [
      { label: 'Jan', price: 45, high: 55, low: 40 },
      { label: 'Feb', price: 48, high: 58, low: 43 },
      { label: 'Mar', price: 52, high: 62, low: 47 },
      { label: 'Apr', price: 55, high: 65, low: 50 },
      { label: 'May', price: 60, high: 70, low: 55 },
      { label: 'Jun', price: 65, high: 75, low: 60 },
      { label: 'Jul', price: 70, high: 80, low: 65 },
      { label: 'Aug', price: 75, high: 85, low: 70 },
      { label: 'Sep', price: 72, high: 82, low: 67 },
      { label: 'Oct', price: 78, high: 88, low: 73 },
      { label: 'Nov', price: 80, high: 90, low: 75 },
      { label: 'Dec', price: 82, high: 92, low: 77 },
    ],
  },
};

export const PLATFORM_GROWTH = [
  { name: 'Jan', users: 4000, orders: 2400 },
  { name: 'Feb', users: 5200, orders: 3100 },
  { name: 'Mar', users: 6100, orders: 4200 },
  { name: 'Apr', users: 7800, orders: 5100 },
  { name: 'May', users: 9200, orders: 6300 },
  { name: 'Jun', users: 12482, orders: 8420 },
];

export function getPriceRange(data: PricePoint[]) {
  const low = Math.min(...data.map((d) => d.low));
  const high = Math.max(...data.map((d) => d.high));
  const current = data[data.length - 1]?.price ?? 0;
  const previous = data[0]?.price ?? 0;
  const change = previous ? ((current - previous) / previous) * 100 : 0;
  return { low, high, current, change };
}
