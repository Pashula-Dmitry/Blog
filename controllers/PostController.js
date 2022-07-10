import PostModal from '../models/Post.js';

export const create = async (req, res) => {
    try {
        const doc = new PostModal({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
            imageUrl: req.body.imageUrl,
        });

        const post = await doc.save();

        res.json(post);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Post creation is failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModal.find().populate('user').exec();
        res.json(posts);

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Posts weren\'t received',
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModal.find().limit(5).exec();
        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5);

        res.json(tags);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Posts weren\'t received',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModal.findOneAndUpdate(
            {
            _id: postId

        },
            {
            $inc: { viewsCount: 1 }
        },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Post weren\'t received',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Post hasn\'t found',
                    });
                }

                res.json(doc);
            }
        ).populate('user');


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Post weren\'t received',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModal.findOneAndDelete(
            {
                _id: postId

            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Failed to delete article',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'article is not found',
                    });
                }

                res.json({
                    success: true,
                });
            }
        );


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Post weren\'t received',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModal.updateOne(
            {
            _id: postId
        }, {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                user: req.userId,
                imageUrl: req.body.imageUrl,
            })

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed update an article',
        });
    }
};
