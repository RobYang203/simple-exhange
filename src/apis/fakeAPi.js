import foodList from "./mockData.json";

const DELAYTIME = 500;

const SUCCESS = "success";
const FAILURE = "failure";

const apiFormat = (type, data) => {
  return {
    type,
    data,
  };
};

const categoryByCity = () => {
  return foodList.reduce((all, food) => {
    const { City } = food;
    const filter = all.filter((item) => {
      return item.category === City;
    });

    if (filter.length === 0) {
      return [
        ...all,
        {
          category: City,
          list: [food],
        },
      ];
    }
    filter[0].list.push(food);
    return all;
  }, []);
};

export const readAllFoodList = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(apiFormat(SUCCESS, categoryByCity()));
    }, DELAYTIME);
  });
};

export const createOrder = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(apiFormat(SUCCESS));
    }, DELAYTIME);
  });
};
