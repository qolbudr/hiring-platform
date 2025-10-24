export interface Job {
  id: string;
  slug: string;
  title: string;
  status: 'active' | 'closed';
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
  }
}

export namespace Job {
  export function parse(data: any): Job {
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      status: data.status,
      salary_range: {
        min: data.salary_range.min,
        max: data.salary_range.max,
        currency: data.salary_range.currency,
        display_text: data.salary_range.display_text,
      },
      description: data.description,
      location: data.location,
      list_card: {
        badge: data.list_card.badge,
        started_on_text: data.list_card.started_on_text,
        cta: data.list_card.cta,
      },
    };
  }
}