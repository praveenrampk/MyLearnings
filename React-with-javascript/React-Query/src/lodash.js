const _  = require('lodash');
const obj = { 
    user: { 
      name: 'John', 
      address: { 
        street: '123 Main St', 
        city: 'Anytown', 
        state: 'CA' 
      } 
    } 
  };
  const isAvailable = _.isEmpty(obj.user);
  console.log(isAvailable);
  const userName = _.get(obj, 'user.name', false);
  console.log(userName); // 'John'

  const streetAddress = _.get(obj, 'user.address.street');
  console.log(streetAddress); // '123 Main St'

  const nonExistentProp = _.get(obj, 'user.phone', 'N/A');
  console.log(nonExistentProp); // 'N/A'
  
  const arr = [ { value: 1 }, { value: 2 } ];
  const secondValue = _.get(arr, '[1].value');
  console.log(secondValue); // 2
  
  const defaultValueFunc = () => 'default value';
  const defaultValueResult = _.get(obj, 'user.phone', defaultValueFunc);
  console.log(defaultValueResult); // 'default value'
  