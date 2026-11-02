export const SERVICE_KEYS = [
  "industrial",
  "building",
  "residential",
  "mall",
  "port",
  "personnel",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_IMAGES: Record<ServiceKey, string> = {
  industrial:
    "https://images.pexels.com/photos/18530600/pexels-photo-18530600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  building:
    "https://images.pexels.com/photos/5567186/pexels-photo-5567186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  residential:
    "https://images.pexels.com/photos/32574417/pexels-photo-32574417.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  mall: "https://images.pexels.com/photos/18530592/pexels-photo-18530592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  port: "https://images.pexels.com/photos/10471869/pexels-photo-10471869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  personnel:
    "https://images.pexels.com/photos/27871948/pexels-photo-27871948.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
};

export const PAGE_IMAGES = {
  home: "https://images.pexels.com/photos/35562107/pexels-photo-35562107.png?auto=compress&cs=tinysrgb&h=650&w=940",
  about:
    "https://images.pexels.com/photos/35557506/pexels-photo-35557506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  services:
    "https://images.pexels.com/photos/8591606/pexels-photo-8591606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  clients:
    "https://images.pexels.com/photos/12515074/pexels-photo-12515074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  gallery:
    "https://images.pexels.com/photos/37379297/pexels-photo-37379297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  contact:
    "https://images.pexels.com/photos/36894415/pexels-photo-36894415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
} as const;

export const GALLERY_CATEGORY_KEYS = [
  "personnel",
  "roll",
  "operations",
  "training",
  "company",
  "partnership",
] as const;

export type GalleryCategoryKey = (typeof GALLERY_CATEGORY_KEYS)[number];

export type GalleryPhoto = {
  id: number;
  category: GalleryCategoryKey;
  image: string;
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    category: "personnel",
    image:
      "https://images.pexels.com/photos/35562107/pexels-photo-35562107.png?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 2,
    category: "roll",
    image:
      "https://images.pexels.com/photos/34954632/pexels-photo-34954632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 3,
    category: "operations",
    image:
      "https://images.pexels.com/photos/30692441/pexels-photo-30692441.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 4,
    category: "training",
    image:
      "https://images.pexels.com/photos/37379297/pexels-photo-37379297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 5,
    category: "personnel",
    image:
      "https://images.pexels.com/photos/8591606/pexels-photo-8591606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 6,
    category: "operations",
    image:
      "https://images.pexels.com/photos/18530592/pexels-photo-18530592.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 7,
    category: "operations",
    image:
      "https://images.pexels.com/photos/10471869/pexels-photo-10471869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 8,
    category: "personnel",
    image:
      "https://images.pexels.com/photos/32574417/pexels-photo-32574417.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 9,
    category: "roll",
    image:
      "https://images.pexels.com/photos/7372462/pexels-photo-7372462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 10,
    category: "partnership",
    image:
      "https://images.pexels.com/photos/12515074/pexels-photo-12515074.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
  {
    id: 11,
    category: "company",
    image:
      "https://images.pexels.com/photos/36894415/pexels-photo-36894415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  },
];

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
