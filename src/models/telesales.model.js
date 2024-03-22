import { isObject } from 'lodash';
import Ratio from 'assets/IconsSVG/FanpageDashboard/Ratio.svg';
import TotalPhone from 'assets/IconsSVG/TelesalesDashboard/TotalPhone.svg';
import TotalDate from 'assets/IconsSVG/TelesalesDashboard/TotalDate.svg';
import TotalCall from 'assets/IconsSVG/TelesalesDashboard/TotalCall.svg';

const iconList = {
  phoneNumber: TotalPhone,
  call: TotalCall,
  appointment: TotalDate,
  conversionRate: Ratio,
};

const titleList = {
  phoneNumber: 'Total phone number',
  call: 'Total call',
  appointment: 'Total appointment',
  conversionRate: 'Ratio',
};

class Telesales {
  static parseResponseTelesale(telesales) {
    if (isObject(telesales)) {
      const newResponse = Object.keys(telesales).reduce((response, currentValue) => {
        if (!Object.keys(titleList).includes(currentValue)) return response
        const newObject = {
          title: titleList[currentValue],
          value: telesales[currentValue].total,
          change: telesales[currentValue].change,
          icon: iconList[currentValue],
        };
        response.push(newObject);
        return response;
      }, []);
      return newResponse;
    }

    return [];
  }
}

export default Telesales;
