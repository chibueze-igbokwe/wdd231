export function getRiskClass(riskLevel) {
  return riskLevel.toLowerCase().replaceAll(" ", "-");
}

export function filterResourcesByCategory(resources, category) {
  if (category === "all") {
    return resources;
  }

  return resources.filter((resource) => resource.category === category);
}