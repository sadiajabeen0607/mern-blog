import { errorHandler } from "../utils/error.js";
import Comment from '../models/comment.model.js'

// Create Comment
export const createComment = async(req, res, next) => {
    try {
        const {content, userId, postId} = req.body;

        if(userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to create this comment'))
        };

        const newComment = new Comment({
            content,
            userId,
            postId
        });

        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
}

// Get Post Comments
export const getPostComments = async(req, res, next) => {

    try {
        const comments = await Comment.find({ postId: req.params.postId}).sort({
            createdAt: -1
        });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

// Like Comment
export const likeComment = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }

        const userIndex = comment.likes.indexOf(req.user.id);

        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}