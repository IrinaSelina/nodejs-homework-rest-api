const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../model");
const Jimp = require("jimp");
const usersDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res) => {
  const id = req.user.id;
  const { path: tempPath, originalname } = req.file;
  const uploadPath = path.join(usersDir, `${id}${originalname}`);
  try {
    const file = await Jimp.read(tempPath);
    await file.resize(250, 250).write(tempPath);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = `/avatars/${id}${originalname}`;
    await User.findByIdAndUpdate(id, { avatarURL });

    return res
      .status(200)
      .json({ status: "success", code: 200, data: avatarURL });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};
module.exports = updateAvatar;
