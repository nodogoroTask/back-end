export const parseFilters = (filters: any) => {
  const newFilters = Object.keys(filters)
    .map((entry) => {
      const key = entry;
      const value = filters[entry];
      const type = value.type;
      const hasMin = value.hasOwnProperty('min');
      const hasMax = value.hasOwnProperty('max');
      const dateType = !isNaN(Date.parse(value));
      const numberType = !isNaN(Number(value));
      const stringType = typeof value === "string";
      const arrayType = Array.isArray(value);

      const greaterThan = '$gte';
      const lessThan = '$lte';

      if (arrayType) return [key, { $in: value }];
      if (type === 'date' || dateType) {
        // Date filter
        const newValue: { [key: string]: any } = {};
        if (hasMin) newValue[greaterThan] = new Date(value.min);
        if (hasMax) newValue[lessThan] = new Date(value.max);
        if (dateType) return [key, new Date(value)];
        return [key, newValue];
      }

      if (type === 'number' || numberType) {
        const newValue: { [key: string]: any } = {};
        if (hasMin) newValue[greaterThan] = Number(value.min);
        if (hasMax) newValue[lessThan] = Number(value.max);
        if (numberType) return [key, Number(value)];
        return [key, newValue];
      }

      
      if (type === 'string' || stringType) {
        return[key, { $regex: value, $options: "i" }]
      }

      return [key, value];
    })
    // a trick to convert array of entities to object
    .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

  return newFilters;
};
