/**
 * Properties of the field.
 */
interface Field {
  /**
   * The name of the field.
   */
  name: string;

  /**
   * The data type of the field. Can be a StringConstructor, NumberConstructor, BooleanConstructor, or DateConstructor.
   */
  type: StringConstructor | NumberConstructor | BooleanConstructor | DateConstructor;

  /**
   * Indicates whether the field is required or not. Defaults to false if not specified.
   */
  required?: boolean;

  /**
   * A brief description or tooltip for the field (optional).
   */
  description?: string;

  /**
   * Specifies the maximum length or value allowed for the field (optional).
   */
  maxLength?: number;

  /**
   * Specifies the minimum length or value required for the field (optional).
   */
  minLength?: number;

  /**
   * Indicates whether the field is read-only or editable (optional).
   */
  readOnly?: boolean;

  /**
   * Specifies a default value for the field (optional).
   */
  defaultValue?: string | number | boolean | Date;

  /**
   * Specifies regular expression pattern for validation (optional).
   */
  pattern?: RegExp;
}

/**
 * Options for the collection.
 */
interface Options {
  /**
   * Indicates whether to automatically generate an ID for each item in the collection.
   * Defaults to false if not specified.
   */
  autoGenerateId?: boolean;

  /**
   * Indicates whether to automatically add timestamps (e.g., createdAt, updatedAt) to items in the collection.
   * Defaults to false if not specified.
   */
  timestamp?: boolean;

  /**
   * Specifies the maximum number of items allowed in the collection (optional).
   */
  maxItems?: number;
}

/**
 * Represents a collection with specified fields and options.
 */
class Collection {
  /**
   * The name of the collection.
   */
  collectionName: string;

  /**
   * An array of fields for the collection.
   */
  fields: Field[];

  /**
   * Options for configuring the collection.
   */
  options: Options;

  /**
   * Creates a new Collection instance.
   * @param {string} collectionName - The name of the collection.
   */
  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * Set the fields for the collection.
   * @param {Field[]} fields - An array of fields for the collection.
   * @returns {Collection} - Returns the Collection instance for chaining.
   */
  setFields(fields: Field[]): Collection {
    this.fields = fields;
    return this;
  }

  /**
   * Set the options for the collection.
   * @param {Options} options - Options for configuring the collection.
   * @returns {Collection} - Returns the Collection instance for chaining.
   */
  setOptions(options: Options): Collection {
    this.options = options;
    return this;
  }
}

export default Collection;
