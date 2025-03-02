import { type SchemaTypeDefinition } from "sanity";

// Schemas
import categoryType from "./categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType
  ],
};

