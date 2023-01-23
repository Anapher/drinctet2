import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { gameCardSchema } from './src/card-schemas';

const jsonSchema = zodToJsonSchema(z.array(gameCardSchema), 'card-deck');

console.log(JSON.stringify(jsonSchema));
