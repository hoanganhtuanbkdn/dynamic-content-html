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
