export interface DynamicTextConfig {
  variableFormat?: {
    start: string;
    end: string;
  };
}

export interface DynamicTextOptions {
  [key: string]: any;
}

export type RichContentFunction = (chunks: string) => string;

export interface RichTextOptions extends DynamicTextOptions {
  [key: string]: RichContentFunction | any;
}

export interface MJMLOptions extends DynamicTextOptions {
  [key: string]: any;
}

export interface MJMLConfig extends DynamicTextConfig {
  mjmlAttributes?: boolean; // Enable MJML attribute processing
  mjmlTextContent?: boolean; // Enable MJML text content processing
}
