export const examples = {
	filter: `{
  "items": [
    { "field": "Name", "operator": "contains", "value": "desk" }
  ],
  "logicalOperator": "And"
}`,
	query: `using System.Text.Json;
using MaterialUIHelper.Extensions;
using MaterialUIHelper.Models.filter;

var filterJson = await request.Content.ReadAsStringAsync();
var filterModel = JsonSerializer.Deserialize<FilterModel>(filterJson)
    ?? new FilterModel();

IQueryable<Product> products = dbContext.Products;
var filteredProducts = products.ApplyDataGridFilter(filterModel, null);`,
	install:
		'dotnet add YourApp.csproj reference ../material-ui-helper/MaterialUIHelper/MaterialUIHelper.csproj',
};
