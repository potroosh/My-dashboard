const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.contentPost.findMany({
      orderBy: { created_at: "desc" },
    });
    return res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error("getAllPosts error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Database error, please try again" });
  }
};

const createPost = async (req, res) => {
  const { title, platform, content_type, status, scheduled_date, caption, notes } =
    req.body;

  const required = { title, platform, content_type, status };
  for (const [field, value] of Object.entries(required)) {
    if (!value) {
      return res.status(400).json({
        success: false,
        message: `${field} is required`,
      });
    }
  }

  try {
    const post = await prisma.contentPost.create({
      data: {
        title,
        platform,
        content_type,
        status,
        scheduled_date: scheduled_date ? new Date(scheduled_date) : null,
        caption: caption || null,
        notes: notes || null,
      },
    });
    return res.status(201).json({ success: true, data: post });
  } catch (err) {
    console.error("createPost error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Database error, please try again" });
  }
};

const updatePost = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, platform, content_type, status, scheduled_date, caption, notes } =
    req.body;

  try {
    const existing = await prisma.contentPost.findUnique({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    const data = {};
    if (title !== undefined) data.title = title;
    if (platform !== undefined) data.platform = platform;
    if (content_type !== undefined) data.content_type = content_type;
    if (status !== undefined) data.status = status;
    if (scheduled_date !== undefined)
      data.scheduled_date = scheduled_date ? new Date(scheduled_date) : null;
    if (caption !== undefined) data.caption = caption;
    if (notes !== undefined) data.notes = notes;

    const post = await prisma.contentPost.update({ where: { id }, data });
    return res.status(200).json({ success: true, data: post });
  } catch (err) {
    console.error("updatePost error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Database error, please try again" });
  }
};

const deletePost = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const existing = await prisma.contentPost.findUnique({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    await prisma.contentPost.delete({ where: { id } });
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error("deletePost error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Database error, please try again" });
  }
};

module.exports = { getAllPosts, createPost, updatePost, deletePost };
