export interface Job {
  id?: string;
  slug: string;
  title: string;
  status: 'active' | 'inactive' | 'draft';
  job_type: string;
  salary_range: {
    min: number;
    max: number;
    currency: string;
    display_text: string;
  };
  description: string[];
  location: string;
  list_card: {
    badge: string;
    started_on_text: string;
    cta: string;
  };
  application_form?: ApplicationForm;
}

export interface ApplicationForm {
  sections: Section[];
}

interface Section {
  title: string;
  fields: Field[];
}

export interface Field {
  key: string;
  validation: Validation;
}

interface Validation {
  required: boolean | undefined;
}

export namespace Job {
  export function parse(data: any): Job {
    return {
      id: String(data.id),
      slug: String(data.slug),
      title: String(data.title),
      status: data.status,
      job_type: String(data.job_type),
      salary_range: {
        min: Number(data.salary_range?.min ?? 0),
        max: Number(data.salary_range?.max ?? 0),
        currency: String(data.salary_range?.currency ?? ''),
        display_text: String(data.salary_range?.display_text ?? ''),
      },
      description: Array.isArray(data.description) ? data.description : [],
      location: String(data.location ?? ''),
      list_card: {
        badge: String(data.list_card?.badge ?? ''),
        started_on_text: String(data.list_card?.started_on_text ?? ''),
        cta: String(data.list_card?.cta ?? ''),
      },
      application_form: data.application_form
        ? {
          sections: (data.application_form.sections || []).map((section: any) => ({
            title: String(section.title ?? ''),
            fields: (section.fields || []).map((field: any) => ({
              key: String(field.key ?? ''),
              validation: {
                required: field.validation?.hasOwnProperty('required') ? Boolean(field.validation?.required) : null,
              },
            })),
          })),
        }
        : undefined,
    };
  }
}
