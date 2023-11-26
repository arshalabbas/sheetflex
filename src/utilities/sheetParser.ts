const sheetParser = (data: any[][]) => {
  if(!data) return [];
  const [keys, ...values] = data;
  return values.map((datum) => {
    const obj = {};
    keys.forEach((key, index) => {
      obj[key as string] = datum[index];
    });
    return obj;
});
}

export default sheetParser;