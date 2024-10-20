type CategoriesType = {
    label: string | number | readonly string[] | undefined;
    name: string;
    icon: string;
  };
  
  type CountriesType = {
    value: string;
    label: string;
  };
  
  type HomesType = {
    id: any;
    price: any;
    title: any;
    images: string[]; // Updated to handle multiple images
    city: any;
    state: any;
    country: any;
    description: any;
    user_id: any;
    created_at: any;
    users: {
      name: any;
    };
  };
  
  type DateStateType = {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  
  type SearchParamsType = {
    country: string;
    weeks: string;
  };