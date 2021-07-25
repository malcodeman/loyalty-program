export type PERKS = {
  results: {
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
  };
};
