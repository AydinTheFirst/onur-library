// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from "@generouted/react-router/client";

export type Path =
  | `/`
  | `/admin`
  | `/admin/books/:bookId`
  | `/admin/categories/:categoryId`
  | `/admin/licenses/:licenseId`
  | `/admin/users/:userId`
  | `/books/:bookId`
  | `/dashboard`
  | `/dashboard/Users`
  | `/login`
  | `/register`;

export type Params = {
  "/admin/books/:bookId": { bookId: string };
  "/admin/categories/:categoryId": { categoryId: string };
  "/admin/licenses/:licenseId": { licenseId: string };
  "/admin/users/:userId": { userId: string };
  "/books/:bookId": { bookId: string };
};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>();
export const { redirect } = utils<Path, Params>();
