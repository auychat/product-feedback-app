export interface IFeedbackContextValue {
  rawData: IFeedback;
  allFeedback: IProductRequests[];
  suggestProduct: IProductRequests[];
  nonSuggestProduct: IProductRequests[];
  sortingCriteria: string;
  setSortingCriteria: (criteria: string) => void;
  sortByCategoryTag: string[];
  handleSelectTag: (tag: string) => void;
  sortSuggestProduct: IProductRequests[];
  addNewFeedback : (newFeedback: IAddNewFeedback) => void;
  editFeedback: (editFeedback: IEditFeedback) => void;
  deleteFeedback: (feedbackId: number) => void;
  addNewComment: (feedbackId: number, newComment: string) => void;
  addReplyMajorComment: (
    feedbackId: number,
    replyToUser: string,
    newReplyMajorComment: string,
  ) => void;
  addReplyMinorComment: (
    feedbackId: number,
    majorCommentId: number,
    replyToUser: string,
    newReplyMinorComment: string,
  ) => void;
  updateUpvote: (feedbackId: number) => void;
}

export interface IFeedback {
  currentUser: ICurrentUser;
  productRequests: IProductRequests[];
}

export interface ICurrentUser {
  image: string;
  name: string;
  username: string;
}

export interface IProductRequests {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: IComments[];
}

export interface IComments {
  id: number;
  content: string;
  user: IUser;
  replies?: IReply[];
}

export interface IUser {
  image: string;
  name: string;
  username: string;
}

export interface IReply {
  content: string;
  replyingTo: string;
  user: IUser;
}

export interface IAddNewFeedback {
  title: string;
  category: string;
  description: string;
}

export interface IEditFeedback {
  id: number;
  title: string;
  category: string;
  status: string;
  description: string;
}

export interface IAddNewComment {
  feedbackId: number;
  comment: string;
}
