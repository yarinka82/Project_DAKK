export interface Timeline {
  yearStart?: number;
  yearEnd?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface City {
  _id: string;
  name: string;
  slug: string;
}

export interface Supplier {
  _id: string;
  name: string;
  location?: string;
  link?: string;
}

export interface Partner extends Supplier {
  logo?: string;
}

export interface generalDesigner extends Supplier {}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
}

export type ConsequenceClass = "CC1" | "CC2" | "CC3";

export interface Location {
  _type: "geopoint";
  lat: number;
  lng: number;
  alt?: number;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
}

interface Advantage {
  title: string;
  description: string;
}

export interface Project {
  _id: string;
  projectName: string;
  slug: string;
  country: string;
  city: City;
  adress: string;
  location: Location;
  area: number;
  timeline: Timeline;
  status: string;
  typeOfServices: string[];
  category: Category;
  constructive: string;
  consequenceClass: ConsequenceClass;
  description?: string;
  advantages?: Advantage[];
  supplier?: Supplier;
  partner?: Supplier;
  generalDesigner?: Supplier;
  award?: string;
  siteUrl?: string;
  cover: string;
  schema?: string;
  photo?: string[];
  linkDocuments?: string;
  seo: Seo;
  _createdAt?: Date;
  _rev?: string;
}
