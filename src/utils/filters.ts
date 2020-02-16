import {Order} from "../library/enums/order-enum";

export default class Filters {
   static sortByProperty<T>(array: T[], propName: keyof T, order: Order): T[] {
      let result = array.sort((a, b) => {
          if (a[propName] < b[propName]) { return -1; }
          if (a[propName] > b[propName]) { return 1; }
          return 0;
      });
      if (order === Order.Descending) { result = array.reverse(); }
      return result;
  }
}