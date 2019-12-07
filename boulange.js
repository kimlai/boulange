const yeast = (total, { hydration, starter }) => {
  const flour = total / (1 + starter / 100 + hydration / 100);
  return {
    total,
    flour,
    water: (hydration / 100) * flour,
    yeast: (starter / 100) * flour
  };
};

const boulange = ({ flour, rates }) => {
  const bread = {
    water: (rates.bread.hydration / 100) * flour,
    yeast: (rates.bread.starter / 100) * flour + 50, //keep some yeast for storage
    salt: (rates.bread.salt / 100) * flour
  };
  const levainToutPoint = yeast(bread.yeast, rates.levainToutPoint);
  const levainJeune = yeast(levainToutPoint.yeast, rates.levainJeune);

  return {
    bread,
    levainToutPoint,
    levainJeune
  };
};

const defaultValues = {
  flour: 500,
  rates: {
    bread: {
      hydration: 75,
      starter: 30,
      salt: 2
    },
    levainToutPoint: {
      hydration: 80,
      starter: 10
    },
    levainJeune: {
      hydration: 100,
      starter: 100
    }
  }
};

new Vue({
  el: "#app",
  data: defaultValues,
  computed: {
    result: function() {
      return boulange({ flour: this.flour, rates: this.rates });
    }
  }
});
