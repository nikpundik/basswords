export const calculate = (level, bassword) => {
  const rules = level.rules.map((rule) => ({
    rule,
    result: rule.check(bassword),
  }));
  const sum = rules.reduce((total, current) => total + current.result, 0);
  const result = Math.round(sum / level.rules.length);
  return { result, rules };
};
