export type PERKS = {
  results: {
    id: string;
    properties: {
      name: {
        title: {
          plain_text: string;
        }[];
      };
      description: {
        rich_text: {
          plain_text: string;
        }[];
      };
      type: {
        select: {
          name: string;
        };
      };
      price: {
        number: number;
      };
    };
  }[];
};
export type USER = {
  id: string;
  properties: {
    email: {
      title: {
        plain_text: string;
      }[];
    };
    balance: {
      number: number;
    };
    start_date: {
      date: {
        start: string;
      };
    };
    perks: {
      relation: {
        id: string;
      }[];
    };
    total_cost: {
      rollup: {
        number: number;
      };
    };
  };
};
export type SESSION = {
  user: { email: string; image: string; name: string };
};
export type PROVIDERS = {
  google: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
};
