import { RowData } from '../../api/types/csvReaderTypes';

export const calculatedPlatoValues = (data: RowData[], discount: number) => {
  const uniquePlatoValues = [...new Set(data.map((item) => item.plato))].filter(
    (platoValue) => platoValue !== '' && platoValue?.includes('°'),
  );

  const resultsForPlato = uniquePlatoValues
    .map((platoValue) => {
      const filteredData = data.filter((item) => item.plato === platoValue);

      const unitPackagesSumQuantities = filteredData.reduce((sum, item) => {
        const unitPackagesRegex = /(but\.|but|can)/g;
        const unitPackages = item.packageType?.match(unitPackagesRegex);
        const unitQuantities =
          item.quantities && unitPackages ? parseInt(item.quantities, 10) : 0;

        switch (item.volume) {
          case '0,5 l':
          case '0,5l':
            return sum + unitQuantities / 200;
          case '0,33 l':
          case '0,33l':
            return sum + unitQuantities * 0.0033;
          case '0,44 l':
          case '0,44l':
            return sum + unitQuantities * 0.0044;
          case '0,375 l':
          case '0,375l':
            return sum + unitQuantities * 0.00375;
          case '0,75 l':
          case '0,75l':
            return sum + unitQuantities * 0.0075;
          default:
            return sum + unitQuantities;
        }
      }, 0);

      const barrelsSumQuantities = filteredData.reduce((sum, item) => {
        const barrelsPackagesRegex = /(keg|keykeg|KeyKeg)/g;
        const barrelsPackages = item.packageType?.match(barrelsPackagesRegex);
        const barrelsQuantities =
          item.quantities && barrelsPackages
            ? parseInt(item.quantities, 10)
            : 0;

        switch (item.volume) {
          case '10 l':
          case '10l':
            return sum + barrelsQuantities * 0.1;
          case '20 l':
          case '20l':
            return sum + barrelsQuantities * 0.2;
          case '30 l':
          case '30l':
            return sum + barrelsQuantities * 0.3;
          default:
            return sum + barrelsQuantities;
        }
      }, 0);

      const unitTax = (unitPackagesSumQuantities * 10.4) / discount;
      const barrelsTax = (barrelsSumQuantities * 10.4) / discount;

      return {
        plato: platoValue,
        unitPackagesSumQuantities: unitPackagesSumQuantities.toFixed(2),
        barrelsSumQuantities: barrelsSumQuantities.toFixed(2),
        unitTax: unitTax.toFixed(2),
        barrelsTax: barrelsTax.toFixed(2),
      };
    })
    .sort((a, b) => {
      const platoA = parseFloat((a.plato || '0').replace(',', '.'));
      const platoB = parseFloat((b.plato || '0').replace(',', '.'));

      return platoA - platoB;
    });

  return resultsForPlato;
};
