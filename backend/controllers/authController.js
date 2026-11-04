import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoire",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "cet email existe déja",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Compte créé avec succés",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et password sont obligatoire",
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email ou password incorrect",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Email ou password incorrect",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login réussi",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error("getUsers error:", error);
    return res.status(500).json({
      message: "erreur serveur",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const deletedCount = await User.destroy({
      where: { id: req.user.id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("deleteAccount error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
