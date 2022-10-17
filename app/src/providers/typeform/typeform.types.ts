export type Metadata = {
  user_agent: string;
  platform: string;
  referer: string;
  network_id: string;
  browser: string;
};

export type Hidden = Record<string, string>;

export type Calculated = {
  score: number;
};

export type Field = {
  id: string;
  ref: string;
  type: string;
};

export type Choice = {
  id: string;
  ref: string;
  label: string;
};

export type Answer = {
  field: Field;
  type: string;
  text: string;
  url: string;
  number?: number;
  file_url: string;
  choice: Choice;
  date?: Date;
};

export type Item = {
  landing_id: string;
  token: string;
  response_id: string;
  landed_at: Date;
  submitted_at: Date;
  metadata: Metadata;
  hidden: Hidden;
  calculated: Calculated;
  answers: Answer[];
};

export type TypeformResponse = {
  total_items: number;
  page_count: number;
  items: Item[];
};
