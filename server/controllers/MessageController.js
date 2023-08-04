import getPrismaInstance from "../utils/PrismaClient.js";
import { renameSync } from "fs";

export const addMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { message, from, to } = req.body;
    const getUser = onlineUsers.get(to);
    if (message && from && to) {
      const newMessages = await prisma.messages.create({
        data: {
          message,
          sender: { connect: { id: parseInt(from) } },
          receiver: { connect: { id: parseInt(to) } },
          messageStatus: getUser ? "delivered" : "sent",
        },
        include: { sender: true, receiver: true },
      });
      return res.status(201).send({ message: newMessages });
    }
    return res
      .status(400)
      .send({ message: "Message, from and to is required" });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { from, to } = req.params;
    if (from && to) {
      const messages = await prisma.messages.findMany({
        where: {
          OR: [
            { senderId: parseInt(from), receiverId: parseInt(to) },
            { senderId: parseInt(to), receiverId: parseInt(from) },
          ],
        },
        orderBy: { id: "asc" },
      });

      const unreadMessages = [];
      messages.forEach((message, index) => {
        if (
          message.messageStatus !== "read" &&
          message.senderId === parseInt(to)
        ) {
          messages[index].messageStatus = "read";
          unreadMessages.push(message.id);
        }
      });

      await prisma.messages.updateMany({
        where: {
          id: { in: unreadMessages },
        },
        data: {
          messageStatus: "read",
        },
      });

      return res.status(200).json({ messages });
    }
    return res.status(400).send({ message: "From and to is required" });
  } catch (error) {
    next(error);
  }
};

export const addImageMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const prisma = getPrismaInstance();
      const { from, to } = req.query;
      if (from && to) {
        const message = await prisma.messages.create({
          data: {
            message: fileName,
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
            type: "image",
          }
        });
        return res.status(201).json({ message });
      }
      return res.status(400).send({ message: "From and to is required" });
    }
    return res.status(400).send({ message: "Image is required" });
  } catch (error) {
    next(error);
  }
};

export const addAudioMessage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = "uploads/recordings/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const prisma = getPrismaInstance();
      const { from, to } = req.query;
      if (from && to) {
        const message = await prisma.messages.create({
          data: {
            message: fileName,
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
            type: "audio",
          }
        });
        return res.status(201).json({ message });
      }
      return res.status(400).send({ message: "From and to is required" });
    }
    return res.status(400).send({ message: "Audio is required" });
  } catch (error) {
    next(error);
  }
};