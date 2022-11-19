import {generateComments} from "../mock/mock-comment";

export default class CommentsModel {
  comments = generateComments();

  getComments = () => this.comments;
};

