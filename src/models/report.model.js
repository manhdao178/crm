import { isObject } from 'lodash';
import Ratio from 'assets/IconsSVG/FanpageDashboard/Ratio.svg';
import TotalPhone from 'assets/IconsSVG/TelesalesDashboard/TotalPhone.svg';
import TotalDate from 'assets/IconsSVG/TelesalesDashboard/TotalDate.svg';
import TotalCall from 'assets/IconsSVG/TelesalesDashboard/TotalCall.svg';

const iconListTelesale = {
  phoneNumber: TotalPhone,
  call: TotalCall,
  appointment: TotalDate,
  conversionRate: Ratio,
};

const titleListTelesale = {
  phoneNumber: 'Total phone number',
  call: 'Total call',
  appointment: 'Total appointment',
  conversionRate: 'Ratio',
};

const iconListPage = {
  data: TotalPhone,
  dataWithPhoneNumber: TotalPhone,
  dataWithPhoneNumberRate: Ratio,
  dataWithValidPhoneNumber: TotalPhone
};

const titleListPage = {
  data: 'Total data',
  dataWithPhoneNumber: 'Total phone number',
  dataWithPhoneNumberRate: 'Ratio',
  dataWithValidPhoneNumber: 'Total valid phone number'
};

class Report {
  static parseResponseReportTelesale(report) {
    if (isObject(report)) {
      const newResponse = Object.keys(report).reduce((response, currentValue) => {
        if (!Object.keys(titleListTelesale).includes(currentValue)) return response;
        const newObject = {
          title: titleListTelesale[currentValue],
          value: report[currentValue].total,
          icon: iconListTelesale[currentValue],
        };

        response.push(newObject);
        return response;
      }, []);
      return newResponse;
    }

    return [];
  }

  static parseResponseReportPageLead(report) {
    if (isObject(report)) {
      const newResponse = Object.keys(report).reduce((response, currentValue) => {
        if (!Object.keys(titleListPage).includes(currentValue)) return response;
        const newObject = {
          title: titleListPage[currentValue],
          value: report[currentValue].total,
          icon: iconListPage[currentValue],
        };

        response.push(newObject);
        return response;
      }, []);
      return newResponse;
    }

    return [];
  }
}

export default Report;
