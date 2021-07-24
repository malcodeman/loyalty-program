export type PERKS = {
  results: {
    properties: {
      name: {
        title: {
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
