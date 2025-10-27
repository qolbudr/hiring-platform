export interface ApplicationAttribute {
  key: string;
  label: string;
  value: string;
  order: number;
}

export interface Application {
  id?: string;
  job_id: string;
  user_id: string;
  attributes: ApplicationAttribute[];
}

export namespace Application {
  export function parse(data: any): Application {
    return {
      id: data.id ? String(data.id ?? '') : undefined,
      job_id: String(data.job_id ?? ''),
      user_id: String(data.user_id ?? ''),
      attributes: Array.isArray(data.attributes)
        ? data.attributes.map((attr: any) => ({
          key: String(attr.key ?? ''),
          label: String(attr.label ?? ''),
          value: String(attr.value ?? ''),
          order: Number(attr.order ?? 0),
        }))
        : [],
    };
  }
}
