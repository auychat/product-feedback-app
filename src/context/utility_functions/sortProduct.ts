import { IProductRequests } from "@/context/FeedbackInterface";

type toTalCommentCountFunction = (product: IProductRequests) => number;

export const sortProduct = (
  suggestProduct: IProductRequests[],
  sortingCriteria: string,
  sortByCategoryTag: string[],
  toTalCommentCount: toTalCommentCountFunction
) => {
  let sortedProductRequest = [...suggestProduct];

  if (sortingCriteria === "Most Upvotes") {
    sortedProductRequest.sort((a, b) => b.upvotes - a.upvotes);
  } else if (sortingCriteria === "Least Upvotes") {
    sortedProductRequest.sort((a, b) => a.upvotes - b.upvotes);
  } else if (sortingCriteria === "Most Comments") {
    sortedProductRequest.sort(
      (a, b) => toTalCommentCount(b) - toTalCommentCount(a)
    );
  } else if (sortingCriteria === "Least Comments") {
    sortedProductRequest.sort(
      (a, b) => toTalCommentCount(a) - toTalCommentCount(b)
    );
  }

  // Then, sort the product requests based on the selected category tags
  if (!sortByCategoryTag.includes("All")) {
    const lowerCaseCategoryTags = sortByCategoryTag.map((tag) =>
      tag.toLowerCase()
    );
    sortedProductRequest = sortedProductRequest.filter((product) => {
      // Filter the product requests based on the selected category tags
      return lowerCaseCategoryTags.includes(product.category);
    });
  }
  return sortedProductRequest;
};
