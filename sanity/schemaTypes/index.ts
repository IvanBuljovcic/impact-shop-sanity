import { type SchemaTypeDefinition } from "sanity";

// Schemas
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType],
};
