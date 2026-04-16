const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password_hash, role },
      select: { id: true, name: true, role: true },
    });

    return res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "No account found with this email" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    return res
      .status(200)
      .json({ success: true, data: { name: user.name, role: user.role } });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

module.exports = { register, login };
