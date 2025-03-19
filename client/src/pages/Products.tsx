"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  category?: string;
  healthGoals?: string[];
  form?: string;
  brand?: string;
  dietaryPreferences?: string[];
}

interface FilterOption {
  id: string;
  label: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.countInStock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">
            ({product.numReviews})
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <Button size="sm" variant="default">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    category: [],
    healthGoals: [],
    form: [],
    brand: [],
    dietaryPreferences: [],
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const productsPerPage = 12;

  // Filter options
  const categories: FilterOption[] = [
    { id: "vitamins", label: "Vitamins" },
    { id: "minerals", label: "Minerals" },
    { id: "protein", label: "Protein Supplements" },
    { id: "herbal", label: "Herbal Supplements" },
    { id: "amino", label: "Amino Acids" },
    { id: "weight", label: "Weight Management" },
  ];

  const healthGoals: FilterOption[] = [
    { id: "immune", label: "Immune Support" },
    { id: "muscle", label: "Muscle Building" },
    { id: "weightloss", label: "Weight Loss" },
    { id: "energy", label: "Energy Boost" },
    { id: "joint", label: "Joint Health" },
    { id: "heart", label: "Heart Health" },
  ];

  const forms: FilterOption[] = [
    { id: "capsules", label: "Capsules" },
    { id: "tablets", label: "Tablets" },
    { id: "powders", label: "Powders" },
    { id: "gummies", label: "Gummies" },
    { id: "liquids", label: "Liquids" },
  ];

  const brands: FilterOption[] = [
    { id: "brand1", label: "Nature's Best" },
    { id: "brand2", label: "VitaStrong" },
    { id: "brand3", label: "PureNutrition" },
    { id: "brand4", label: "HealthPlus" },
    { id: "brand5", label: "Optimal Wellness" },
  ];

  const dietaryPreferences: FilterOption[] = [
    { id: "vegan", label: "Vegan" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "gluten-free", label: "Gluten-Free" },
    { id: "non-gmo", label: "Non-GMO" },
    { id: "organic", label: "Organic" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          // Generate sample products with filter properties
          const sampleProducts = Array.from({ length: 100 }, (_, index) => {
            const categoryOptions = [
              "vitamins",
              "minerals",
              "protein",
              "herbal",
              "amino",
              "weight",
            ];
            const formOptions = [
              "capsules",
              "tablets",
              "powders",
              "gummies",
              "liquids",
            ];
            const brandOptions = [
              "brand1",
              "brand2",
              "brand3",
              "brand4",
              "brand5",
            ];
            const dietaryOptions = [
              "vegan",
              "vegetarian",
              "gluten-free",
              "non-gmo",
              "organic",
            ];
            const healthGoalOptions = [
              "immune",
              "muscle",
              "weightloss",
              "energy",
              "joint",
              "heart",
            ];

            // Randomly assign 1-3 health goals
            const numHealthGoals = Math.floor(Math.random() * 3) + 1;
            const productHealthGoals = [];
            for (let i = 0; i < numHealthGoals; i++) {
              const randomGoal =
                healthGoalOptions[
                  Math.floor(Math.random() * healthGoalOptions.length)
                ];
              if (!productHealthGoals.includes(randomGoal)) {
                productHealthGoals.push(randomGoal);
              }
            }

            // Randomly assign 1-2 dietary preferences
            const numDietaryPrefs = Math.floor(Math.random() * 2) + 1;
            const productDietaryPrefs = [];
            for (let i = 0; i < numDietaryPrefs; i++) {
              const randomPref =
                dietaryOptions[
                  Math.floor(Math.random() * dietaryOptions.length)
                ];
              if (!productDietaryPrefs.includes(randomPref)) {
                productDietaryPrefs.push(randomPref);
              }
            }

            return {
              _id: (index + 1).toString(),
              name: `Supplement ${index + 1}`,
              image: "https://via.placeholder.com/300",
              description: `Premium quality supplement for optimal health and wellness.`,
              price: Math.floor(Math.random() * 50) + 10,
              countInStock: Math.floor(Math.random() * 20),
              rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
              numReviews: Math.floor(Math.random() * 100) + 5,
              category:
                categoryOptions[
                  Math.floor(Math.random() * categoryOptions.length)
                ],
              healthGoals: productHealthGoals,
              form: formOptions[Math.floor(Math.random() * formOptions.length)],
              brand:
                brandOptions[Math.floor(Math.random() * brandOptions.length)],
              dietaryPreferences: productDietaryPrefs,
            };
          });

          setProducts(sampleProducts);
          setFilteredProducts(sampleProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, activeFilters, sortOption, products]);

  const applyFilters = () => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    if (activeFilters.category.length > 0) {
      result = result.filter((product) =>
        activeFilters.category.includes(product.category || "")
      );
    }

    // Apply health goals filters
    if (activeFilters.healthGoals.length > 0) {
      result = result.filter((product) =>
        product.healthGoals?.some((goal) =>
          activeFilters.healthGoals.includes(goal)
        )
      );
    }

    // Apply form filters
    if (activeFilters.form.length > 0) {
      result = result.filter((product) =>
        activeFilters.form.includes(product.form || "")
      );
    }

    // Apply brand filters
    if (activeFilters.brand.length > 0) {
      result = result.filter((product) =>
        activeFilters.brand.includes(product.brand || "")
      );
    }

    // Apply dietary preference filters
    if (activeFilters.dietaryPreferences.length > 0) {
      result = result.filter((product) =>
        product.dietaryPreferences?.some((pref) =>
          activeFilters.dietaryPreferences.includes(pref)
        )
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "priceLowToHigh":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        result.sort((a, b) => b.price - a.price);
        break;
      case "topRated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "bestSellers":
        result.sort((a, b) => b.numReviews - a.numReviews);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters((prev) => {
      const updatedFilters = { ...prev };

      if (updatedFilters[filterType].includes(value)) {
        // Remove the filter if it's already active
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        // Add the filter
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }

      return updatedFilters;
    });
  };

  const clearFilter = (filterType: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: [],
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      healthGoals: [],
      form: [],
      brand: [],
      dietaryPreferences: [],
    });
    setSearchQuery("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleGoToPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      pageNumber: { value: string };
    };
    const pageNumber = Number.parseInt(target.pageNumber.value, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
    }
  };

  // Count active filters
  const totalActiveFilters = Object.values(activeFilters).reduce(
    (sum, filters) => sum + filters.length,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500 font-semibold">{error}</div>
    );
  }

  const FilterSection = ({
    title,
    options,
    filterType,
  }: {
    title: string;
    options: FilterOption[];
    filterType: string;
  }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        {activeFilters[filterType].length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clearFilter(filterType)}
            className="h-6 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={activeFilters[filterType].includes(option.id)}
              onCheckedChange={() => handleFilterChange(filterType, option.id)}
            />
            <label
              htmlFor={option.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supplements</h1>
        <p className="text-muted-foreground">
          Find the perfect supplements to support your health and wellness goals
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              {totalActiveFilters > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear All
                </Button>
              )}
            </div>

            <FilterSection
              title="Category"
              options={categories}
              filterType="category"
            />
            <Separator className="my-4" />
            <FilterSection
              title="Health Goals"
              options={healthGoals}
              filterType="healthGoals"
            />
            <Separator className="my-4" />
            <FilterSection title="Form" options={forms} filterType="form" />
            <Separator className="my-4" />
            <FilterSection title="Brand" options={brands} filterType="brand" />
            <Separator className="my-4" />
            <FilterSection
              title="Dietary Preferences"
              options={dietaryPreferences}
              filterType="dietaryPreferences"
            />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {totalActiveFilters > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {totalActiveFilters}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[350px] overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down products by applying filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                {totalActiveFilters > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="mb-4 w-full"
                  >
                    Clear All Filters
                  </Button>
                )}
                <FilterSection
                  title="Category"
                  options={categories}
                  filterType="category"
                />
                <Separator className="my-4" />
                <FilterSection
                  title="Health Goals"
                  options={healthGoals}
                  filterType="healthGoals"
                />
                <Separator className="my-4" />
                <FilterSection title="Form" options={forms} filterType="form" />
                <Separator className="my-4" />
                <FilterSection
                  title="Brand"
                  options={brands}
                  filterType="brand"
                />
                <Separator className="my-4" />
                <FilterSection
                  title="Dietary Preferences"
                  options={dietaryPreferences}
                  filterType="dietaryPreferences"
                />
              </div>
              <div className="mt-4">
                <SheetClose asChild>
                  <Button className="w-full">Apply Filters</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search supplements..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priceLowToHigh">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="priceHighToLow">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="topRated">Top Rated</SelectItem>
                <SelectItem value="bestSellers">Best Sellers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {totalActiveFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(activeFilters).map(([filterType, values]) =>
                values.map((value) => {
                  // Find the label for this filter value
                  let label = value;
                  if (filterType === "category") {
                    label =
                      categories.find((c) => c.id === value)?.label || value;
                  } else if (filterType === "healthGoals") {
                    label =
                      healthGoals.find((h) => h.id === value)?.label || value;
                  } else if (filterType === "form") {
                    label = forms.find((f) => f.id === value)?.label || value;
                  } else if (filterType === "brand") {
                    label = brands.find((b) => b.id === value)?.label || value;
                  } else if (filterType === "dietaryPreferences") {
                    label =
                      dietaryPreferences.find((d) => d.id === value)?.label ||
                      value;
                  }

                  return (
                    <Badge
                      key={`${filterType}-${value}`}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {label}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                        onClick={() => handleFilterChange(filterType, value)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })
              )}
              {totalActiveFilters > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs h-7"
                >
                  Clear All
                </Button>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
              {totalActiveFilters > 0 && " with selected filters"}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <SlidersHorizontal className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button onClick={clearAllFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex flex-wrap gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    // Near the start
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    // Near the end
                    pageNum = totalPages - 4 + i;
                  } else {
                    // In the middle
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(pageNum)}
                      className={cn(
                        "w-9",
                        currentPage === pageNum && "pointer-events-none"
                      )}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-2 self-center">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => paginate(totalPages)}
                      className="w-9"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>

              <form
                onSubmit={handleGoToPage}
                className="flex items-center gap-2 ml-2"
              >
                <Input
                  type="number"
                  name="pageNumber"
                  min="1"
                  max={totalPages}
                  placeholder="Go to"
                  className="w-16 h-9"
                />
                <Button type="submit" size="sm" variant="outline">
                  Go
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
